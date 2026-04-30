import {ActivityIndicator, Platform, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {
  SplashScreen,
  useSelector,
  Provider,
  useDispatch,
  Toast,
  AsyncStorage,
  messaging,
  notifee,
  GoogleSignin,
  statusCodes,
  RNCalendarEvents,
} from './src/components/store/ExternalLibrary';
import {Auth} from './src/components/store/ScreenStore';
import store, {RootState} from './src/redux/store/Store';
import Main from './src/navigation/main/Main';
import {ConfirmationPopup} from './src/components/store/ComponentStore';
import Echo from 'laravel-echo';
import io from 'socket.io-client';
import {
  setAuthToken,
  setClinicName,
  setClinicProfile,
  setFCMToken,
  setIsLogoutPopOpen,
  setIsLogoutSuccess,
} from './src/redux/slices/CommonSlice';
import GLOBALSTYLE from './src/theme/GlobalStyle';
import {
  setAddMessage,
  setEchoInstance,
  setIsConnected,
  setMessageReceived,
  setSocketStatus,
} from './src/redux/slices/SingleMessageSlice';
import {SOCKET_URL} from './src/constants/Data';
import {ChatMessage} from './src/types/DataTypes';
import {AndroidImportance, EventType} from '@notifee/react-native';
import {navigate} from './NavigationService';

const ChildApp = () => {
  const {auth_token, profileId, isLogoutPopOpen, isLoading} = useSelector(
    (state: RootState) => state.commonSlice,
  );

  const [syncResult, setSyncResult] = useState(null);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();

  // Notification Channel Setup
  const setupNotificationChannel = async () => {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'default',
      importance: AndroidImportance.HIGH,
    });
  };

  // Handle notification tap action
  const handleNotificationTap = (data: any) => {
    if (!data) return;
    switch (data.type) {
      case 'Rating':
        navigate('MY_RATING_REVIEWS');
        break;
      case 'New Profile Match':
        navigate('CANDIDATE_PROFILE', {
          candidateId: Number(data.id),
          jobId: Number(data.jobId), // Ensure `data.jobId` exists or adjust accordingly
        });
        break;
      case 'apply jobs':
        navigate('JOB_DETAILS', {jobId: Number(data.id)});
        break;
      default:
        navigate('SINGLE_MESSAGE', {
          candidateId: Number(data?.id),
          candidateName: data?.name || 'Candidate Name',
          candidateProfile: data?.icon || 'Candidate Profile',
        });
    }
  };

  // Display foreground notification using Notifee
  const displayNotification = async (remoteMessage: any) => {
    const {notification, data} = remoteMessage;
    console.log('user pressed notification:', data);
    await notifee.displayNotification({
      title: notification?.title || 'New Notification',
      body: notification?.body || '',
      data: data || {},
      android: {
        channelId: 'default',
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: 'default',
      },
    });
  };

  // Notification handlers
  const setupNotificationHandlers = () => {
    // 1. Foreground notifications
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification received:', remoteMessage);
      dispatch(setMessageReceived(Date.now()));
      await displayNotification(remoteMessage);
    });


    // 2. Background/Quit state notifications
    const unsubscribeBackground = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log('Notification opened from background:', remoteMessage);
        if (remoteMessage?.data) {
          handleNotificationTap(remoteMessage.data);
        }
      },
    );

    // 3. Initial notification (app was quit)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('Initial notification:', remoteMessage);
        if (remoteMessage?.data) {
          handleNotificationTap(remoteMessage.data);
        }
      });

    // 4. Notifee foreground tap handler
    const notifeeUnsubscribe = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS && detail.notification?.data) {
        handleNotificationTap(detail.notification.data);
      }
    });

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
      notifeeUnsubscribe();
    };
  };

  // Socket connection management
  let echo: any = null;

  const connectSocket = (authToken: string, profileId: string) => {
    if (!profileId || !authToken) {
      console.warn('🔴 Missing profileId or token. Cannot connect to socket.');
      return;
    }

    if (echo) {
      echo.leave(`chat.recruiter.${profileId}`);
      echo.disconnect();
      echo = null;
    }

    try {
      dispatch(setSocketStatus('connecting'));
      echo = new Echo({
        broadcaster: 'socket.io',
        host: SOCKET_URL,
        client: io,
        authEndpoint:
          'https://fillin-admin.cyberxinfosolution.com/api/broadcasting/auth',
        auth: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      });

      echo.connector.socket.on('connect', () => {
        console.log('✅ Socket connected');
        dispatch(setIsConnected(true));
        dispatch(setSocketStatus('connected'));
      });

      echo.connector.socket.on('disconnect', () => {
        console.log('🔴 Socket disconnected');
        dispatch(setIsConnected(false));
        dispatch(setSocketStatus('disconnected'));
      });

      echo.connector.socket.on('connect_error', (err: any) => {
        console.log('❌ Socket connection error:', err);
        dispatch(setIsConnected(false));
        dispatch(setSocketStatus('disconnected'));
      });

      const channelName = `chat.recruiter.${profileId}`;
      const eventName = '.message.sent';

      echo
        .private(channelName)
        .subscribed(() => {
          console.log(`📡 Subscribed to ${channelName}`);
        })
        .listen(eventName, (data: any) => {
          dispatch(setMessageReceived(Date.now()));
          const receivedMessage: ChatMessage = {
            id: data.id?.toString() || Date.now().toString(),
            senderId: data.sender_id,
            content: data.message,
            timestamp: data.created_at || new Date().toISOString(),
            isMe: data.sender_id === profileId,
          };
          dispatch(setAddMessage(receivedMessage));
        })
        .error((err: any) => {
          console.error('❌ Echo subscription error:', err);
        });

      dispatch(setEchoInstance(echo));
    } catch (error) {
      console.error('❌ Error initializing Echo:', error);
      dispatch(setSocketStatus('disconnected'));
    }
  };

  const disconnectSocket = () => {
    const {echoInstance} = store.getState().singleMessageSlice;
    if (echoInstance) {
      echoInstance.disconnect();
      dispatch(setEchoInstance(null));
      dispatch(setIsConnected(false));
      dispatch(setSocketStatus('disconnected'));
    }
  };

  // Permission handling
  const requestNotificationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      }

      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        dispatch(setFCMToken(token));
        console.log('FCM Token:', token);
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  // Auth token handling
  const getAuthToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken) {
        dispatch(setAuthToken(storedToken));
      }
    } catch (err) {
      console.warn('Error while getting token:', err);
    } finally {
      SplashScreen.hide();
      setIsReady(true);
    }
  };

  // Effects
  useEffect(() => {
    setupNotificationChannel();
    requestNotificationPermission();
    getAuthToken();
  }, []);

  useEffect(() => {
    const cleanup = setupNotificationHandlers();
    return cleanup;
  }, []);

  useEffect(() => {
    if (auth_token && profileId) {
      connectSocket(auth_token, profileId);
    }
    return () => disconnectSocket();
  }, [auth_token, profileId]);

  // Logout handlers
  const handleYes = async () => {
    dispatch(setIsLogoutPopOpen(false));
    dispatch(setAuthToken(''));
    dispatch(setIsLogoutSuccess(true));
    await AsyncStorage.removeItem('authToken');
    dispatch(setClinicName(''));
    dispatch(setClinicProfile(''));
  };

  const handleNo = () => {
    dispatch(setIsLogoutPopOpen(false));
  };

  const handleNuteral = () => {
    dispatch(setIsLogoutPopOpen(true));
  };

  if (!isReady) return null;

  return (
    <>
      {auth_token ? <Main /> : <Auth />}
      {isLogoutPopOpen && (
        <ConfirmationPopup
          _TITLE="Logout"
          _SUBTITLE="Are you sure you want to logout?"
          _HANDLEYES={handleYes}
          _HANLDENO={handleNo}
          _HANDLENUTERAL={handleNuteral}
        />
      )}
      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}
      <Toast />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ChildApp />
    </Provider>
  );
};

export default App;
