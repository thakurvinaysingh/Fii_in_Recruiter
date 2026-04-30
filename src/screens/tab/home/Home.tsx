import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './StyleHome';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  CandidateCategories,
  CandidateProfiles,
  ToastPopup,
} from '../../../components/store/ComponentStore';
import {
  mainLogo,
  notification,
  profile,
  searchGrey,
} from '../../../components/store/ImageStore';
import {
  NativeStackNavigationProp,
  useNavigation,
  useSelector,
  SafeAreaView,
  axios,
  useDispatch,
  useFocusEffect,
  GoogleSignin,
  statusCodes,
  RNCalendarEvents,
} from '../../../components/store/ExternalLibrary';
import {RootState} from '../../../redux/store/Store';
import {CandidateIF, CategoryIF} from '../../../types/DataTypes';
import {MainStackIF} from '../../../types/MainStackTypes';
import {gettingProfileId} from '../../../api/ApiServices';
import {
  setIsProfileCompleted,
  setNotificationUnredLength,
  setProfileId,
  setProfileImg,
} from '../../../redux/slices/CommonSlice';
import Theme from '../../../theme/Theme';

type mainProp = NativeStackNavigationProp<MainStackIF>;
const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState<CategoryIF[]>([]);
  const [candidate, setCandidate] = useState<CandidateIF[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [syncResult, setSyncResult] = useState(null);
  const [error, setError] = useState(null);
  const mainNavigation = useNavigation<mainProp>();
  const {
    isUnsavedSuccess,
    isSavedSuccess,
    profileImg,
    auth_token,
    notificationUnreadLenght,
  } = useSelector((state: RootState) => state.commonSlice);
    const {
      practiceName
    } = useSelector((state: RootState) => state.profileSlice.practiceInformation);

  const {messageReceived} = useSelector(
    (state: RootState) => state.singleMessageSlice,
  );

  const handleProfile = () => mainNavigation.navigate('ACCOUNT');
  const handleNotification = () => {
    mainNavigation.navigate('NOTIFICATION');
  };

  // MAKING THE CONNECTION OF THE SOCKET
  // GETTING DASHBOARD DATA
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://fillin-admin.cyberxinfosolution.com/api/dashboard',
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status == 200) {
        setCategory(response.data.data.specialization);
        setIsLoading(false);
      } else {
        console.error('Error in fetch dashboard:', response.data);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.log('Error in dashboard:', err);
      setIsLoading(false);
    }
  };

  const getProfileId = async () => {
    try {
      const res = await gettingProfileId();
      if (res.success) {
        console.log('res of profile and id:', res.data.data);
        dispatch(setProfileId(res.data.data.id));
        dispatch(setProfileImg(res.data.data.profile));
        dispatch(setNotificationUnredLength(res.data.data.unreadNotification));
        dispatch(setIsProfileCompleted(res.data.data.is_completed));
      } else {
        console.error('Error while getting profile and id in else:', res.err);
      }
    } catch (err: any) {
      console.error('Error while getting profile id and image:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDashboardData();
      dispatch(setProfileImg(''));
    }, []),
  );

  useEffect(() => {
    getProfileId();
  }, [messageReceived, profileImg]);
  const handleSearch = () => mainNavigation.navigate('SEARCH');

  // PULL TO REFERESH
  const onRefresh = () => {
    setTimeout(() => {
      setRefreshing(true);
      fetchDashboardData();
      getProfileId();
      setRefreshing(false);
    }, 500);
  };

  // SYNC CALENDAR

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      webClientId:
        '1026549752959-ifgak645nqc8rlteoh0gl8mvhnco9qkm.apps.googleusercontent.com', // from Google Cloud Console
      offlineAccess: true,
      iosClientId:
        '1026549752959-su2t4ojimeagpgjlirrab31etlc2193e.apps.googleusercontent.com', // from Google Cloud Console
    });
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return userInfo;
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.log('Some other error happened', error);
      }
      throw error;
    }
  };

  const getGoogleAuthToken = async () => {
    try {
      const tokens = await GoogleSignin.getTokens();
      return tokens.accessToken;
    } catch (error) {
      console.log('Error getting auth token', error);
      throw error;
    }
  };

  const requestCalendarPermission = async () => {
    try {
      const status = await RNCalendarEvents.requestPermissions();
      return status === 'authorized';
    } catch (error) {
      console.log('Error requesting calendar permissions', error);
      return false;
    }
  };

  const syncGoogleCalendarEvents = async () => {
    try {
      // 1. Get Google auth token
      const accessToken = await getGoogleAuthToken();

      // 2. Request device calendar permissions
      const hasPermission = await requestCalendarPermission();
      if (!hasPermission) {
        throw new Error('Calendar permission denied');
      }

      // 3. Fetch events from Google Calendar
      const now = new Date();
      const oneMonthLater = new Date();
      oneMonthLater.setMonth(now.getMonth() + 1);

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
          `timeMin=${now.toISOString()}&timeMax=${oneMonthLater.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const data = await response.json();
      const events = data.items || [];

      // 4. Save events to device calendar
      for (const event of events) {
        await RNCalendarEvents.saveEvent(event.summary, {
          startDate:
            event.start.dateTime || `${event.start.date}T00:00:00.000Z`,
          endDate: event.end.dateTime || `${event.end.date}T23:59:59.000Z`,
          description: event.description,
          location: event.location,
        });
      }

      return {success: true, count: events.length};
    } catch (error) {
      console.log('Error syncing calendar events', error);
      throw error;
    }
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleSync = async () => {
    // setIsLoading(true);
    // setError(null);
    try {
      await signInWithGoogle();
      const result: any = await syncGoogleCalendarEvents();
      setSyncResult(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView
        style={GLOBALSTYLE.safeContainer}
        edges={['top', 'left', 'right']}>
        <View style={[GLOBALSTYLE.container_jobs]}>
          {/* Top bar */}
          <View style={[GLOBALSTYLE.flex, styles.header]}>
            <TouchableOpacity onPress={handleProfile}>
              <Image
                source={profileImg ? {uri: profileImg} : profile}
                style={styles.profile}
              />
            </TouchableOpacity>
            <Image source={mainLogo} style={styles.main_logo} />
            <TouchableOpacity onPress={handleNotification} activeOpacity={1}>
              <Image style={styles.notification_img} source={notification} />
              {notificationUnreadLenght > 0 && (
                <View style={styles.notification_count_box}>
                  <Text style={styles.unread_count_text}>
                    {notificationUnreadLenght > 9
                      ? '9+'
                      : notificationUnreadLenght}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* MIDDLE VIEW FOR CONTENT AND LOADER */}
          {isLoading ? (
            <View style={GLOBALSTYLE.activity_indicator_container_half}>
              <ActivityIndicator size="large" color="#0165fc" />
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <Text style={[styles.title_heading]}>Good morning, {practiceName}</Text>
              <View>
                {/* SEARCH INPUT FOR CANDIDATE SEARCH */}
                {/* RED LABEL WITH TEXT */}
                <View style={[styles.red_button_container_2]}>
                  <Text
                    style={GLOBALSTYLE.medium_title_red}
                    onPress={handleSync}>
                    Need Fill-In staff today?
                  </Text>
                  <Text
                    style={GLOBALSTYLE.medium_title_red_1}
                    onPress={handleSync}>
                    Request a dental professional in a few tops.
                  </Text>
                  <Text
                    style={GLOBALSTYLE.medium_title_red_2}
                    onPress={handleSync}>
                    Request Fill-In Staff Now
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={handleSearch}
                  activeOpacity={0.9}
                  style={[styles.search_container, GLOBALSTYLE.mg_bottom_xs]}>
                  <Image source={searchGrey} style={styles.search_img} />
                  <Text style={styles.find_candidate_text}>
                    Search Dental Professionals
                  </Text>
                </TouchableOpacity>

                {/* Categories */}
                {category.length > 0 && (
                  <View style={GLOBALSTYLE.mg_top_xxxs}>
                    <Text style={GLOBALSTYLE.button_black}>
                      Browse by Candidate Categories
                    </Text>
                    <View style={[GLOBALSTYLE.mg_top_xs, GLOBALSTYLE.flex]}>
                      <FlatList
                        data={category}
                        numColumns={2}
                        removeClippedSubviews={false}
                        keyExtractor={item => item.id.toString()}
                        scrollEnabled={false}
                        renderItem={({item}) => (
                          <CandidateCategories item={item} />
                        )}
                      />
                    </View>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Theme?.COLORS?.DARK_BLUE,
                      paddingHorizontal: 15,
                      borderRadius: 10,
                      paddingVertical: 10,
                      width: '45%',
                    }}
                    onPress={() => mainNavigation.navigate('Create Job')}>
                    <Text style={{color: 'white',  textAlign: 'center',}}>Post A New Job</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: Theme?.COLORS?.WHITE,
                      paddingHorizontal: 15,
                      borderRadius: 10,
                      paddingVertical: 10,
                      borderWidth:1,
                      borderColor:Theme?.COLORS?.DARK_BLUE,
                      width: '45%',
                     
                    }}
                    onPress={() => {}}>
                    <Text style={{color: Theme?.COLORS?.DARK_BLUE,  textAlign: 'center',}}>
                      View My Jobs
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </SafeAreaView>

      {/* Toasts */}
      {isUnsavedSuccess && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Job unsaved successfully"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
      {isSavedSuccess && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Job saved successfully"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
    </>
  );
};

export default Home;
