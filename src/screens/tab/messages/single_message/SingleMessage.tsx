import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Image,
  BackHandler,
} from 'react-native';
import axios from 'axios';
import {RouteProp, useRoute} from '@react-navigation/native';
import styles from '../StyleMessages';
import {
  useSelector,
  useNavigation,
  NativeStackNavigationProp,
  useDispatch,
  RH,
} from '../../../../components/store/ExternalLibrary';
import {RootState} from '../../../../redux/store/Store';
import {MainStackIF} from '../../../../types/MainStackTypes';
import GLOBALSTYLE from '../../../../theme/GlobalStyle';
import {
  setMessages,
  setAddMessage,
  updateMessageStatus,
} from '../../../../redux/slices/SingleMessageSlice';
import {
  backMain,
  placeholderBig,
  sendChat,
} from '../../../../components/store/ImageStore';
import Theme from '../../../../theme/Theme';
import {markingAsReadChat} from '../../../../api/ApiServices';
type routeProp = RouteProp<MainStackIF, 'SINGLE_MESSAGE'>;
type navigationProp = NativeStackNavigationProp<MainStackIF>;
interface ChatMessage {
  id: string;
  senderId?: string;
  content?: string;
  timestamp?: string;
  isMe?: boolean;
  datelabel?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'failed';
  type?: 'message' | 'date';
}

const API_BASE_URL =
  'https://fillin-admin.cyberxinfosolution.com/api/recruiter/';

const SingleMessage = () => {
  const route = useRoute<routeProp>();
  const params = route.params;
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<navigationProp>();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // REDUX STATES FOR MESSAGES
  const dispatch = useDispatch();
  const {messages, isConnected, socketStatus} = useSelector(
    (state: RootState) => state.singleMessageSlice,
  );

  const flatListRef = useRef<FlatList>(null);
  const {profileId, auth_token} = useSelector(
    (state: RootState) => state.commonSlice,
  );

  const handleBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );
    return () => backHandler.remove();
  }, [navigation]);

  // TRIM THE TEXT AND SHOW ...
  const truncateString = (string: string, maxLength: number) => {
    return string.length <= maxLength
      ? string
      : string.slice(0, maxLength) + '...';
  };

  // FORMATTING TIME TO SEND WITH MESSAGE
  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${auth_token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Timezone: timezone,
    },
  });

  // GETTING CHAT HISTORY
  const loadChatHistory = async () => {
    try {
      const response = await axios.get(
        `https://fillin-admin.cyberxinfosolution.com/api/recruiter/chat-history/${params.candidateId}`,
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data?.status === 'success' && response.data.data) {
        const rawData = response.data.data;

        const mixedMessages: ChatMessage[] = [];

        rawData.forEach((item: any, index: number) => {
          if (item.datelabel) {
            mixedMessages.push({
              id: `date-${index}`,
              datelabel: item.datelabel,
              type: 'date',
            } as any);
          } else {
            mixedMessages.push({
              id: `${index}`,
              senderId: item.msgStatus === 'send' ? profileId : '0',
              content: item.message,
              timestamp: item.time || new Date().toISOString(),
              isMe: item.msgStatus === 'send',
              type: 'message',
            });
          }
        });

        dispatch(setMessages(mixedMessages.reverse()));
      }
    } catch (error: any) {
      console.error('Failed to load chat history:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to load chat history',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      loadChatHistory();
    });
  }, []);

  // SEND MESSAGE
  const handleSendMessage = async () => {
    setNewMessage('');
    if (!newMessage.trim() || !isConnected) {
      Alert.alert(
        'Error',
        !isConnected ? 'Waiting for connection...' : 'Message cannot be empty',
      );
      return;
    }

    const tempId = Date.now().toString();

    const tempMessage: ChatMessage = {
      id: tempId,
      senderId: profileId,
      content: newMessage,
      timestamp: formatTime(new Date()),
      isMe: true,
      status: 'sending',
    };

    try {
      dispatch(setAddMessage(tempMessage));
      setNewMessage('');
      scrollToBottom();

      const response = await api.post('chat', {
        candidate_id: params.candidateId,
        message: newMessage,
        timezone: timezone,
      });

      if (response.data?.status === 'success') {
        dispatch(
          updateMessageStatus({
            tempId,
            newId: response.data.data?.id || tempId,
            status: 'sent',
          }),
        );
      } else {
        throw new Error('Send failed');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      dispatch(
        updateMessageStatus({
          tempId,
          newId: tempId,
          status: 'failed',
        }),
      );
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  };

  // MARK AS READ CHAT
  const markAsReadChat = async (id: number) => {
    try {
      const res = await markingAsReadChat(id);
      if (res.success) {
        console.log('res of chat read:', res.data.data);
      } else {
        console.error('err in chat read:', res.err);
      }
    } catch (err: any) {
      console.error('err in chat read:', err);
    }
  };

  useEffect(() => {
    markAsReadChat(params.candidateId);
  }, []);

  const scrollToBottom = (animated = true) => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated});
    }, 100); // Delay slightly to allow layout
  };

  // RENDER THE UI OF CHAT
  const renderMessage = ({item}: {item: ChatMessage}) => {
    if (item.type === 'date') {
      return (
        <View style={{paddingVertical: 10}}>
          <Text style={[GLOBALSTYLE.small_title, GLOBALSTYLE.text_center]}>
            {item.datelabel}
          </Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageContainer,
          item.isMe ? styles.myMessageContainer : styles.otherMessageContainer,
        ]}>
        <View
          style={[
            styles.messageContent,
            item.isMe ? styles.myMessageContent : styles.otherMessageContent,
          ]}>
          <Text
            style={[
              !item.isMe
                ? GLOBALSTYLE.small_text_bigger
                : GLOBALSTYLE.small_text_bigger_white,
            ]}>
            {item.content}
          </Text>
          <Text style={[item.isMe ? styles.timeText : styles.timeTextOther]}>
            {item.timestamp}
          </Text>
          {item.status === 'failed' && (
            <Text style={styles.failedText}>Failed to send</Text>
          )}
        </View>
        {/* {item.isMe && item.status === 'sending' && (
          <ActivityIndicator size="small" style={styles.statusIndicator} />
        )} */}
      </View>
    );
  };

  // if (isLoading) {
  //   return (
  //     <View style={GLOBALSTYLE.activity_indicator_container}>
  //       <ActivityIndicator size="small" />
  //     </View>
  //   );
  // }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? RH(0) : RH(4)}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <SafeAreaView style={GLOBALSTYLE.safeContainer}>
        <View style={GLOBALSTYLE.container}>
          <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_m]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
              hitSlop={30}>
              <Image source={backMain} style={GLOBALSTYLE.back_btn} />
            </TouchableOpacity>
            <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s, styles.header]}>
              <Image
                source={
                  params.candidateProfile
                    ? {uri: params.candidateProfile}
                    : placeholderBig
                }
                style={styles.profile_img}
              />
              <View>
                <Text style={GLOBALSTYLE.medium_title}>
                  {truncateString(params.candidateName, 17)}
                </Text>
                <Text
                  style={[
                    socketStatus === 'connecting'
                      ? GLOBALSTYLE.small_text_grey
                      : socketStatus === 'connected'
                      ? GLOBALSTYLE.small_text_green
                      : GLOBALSTYLE.small_text_red,
                  ]}>
                  {socketStatus === 'connecting' && 'Connecting to Network...'}
                  {socketStatus === 'connected' && 'Connected'}
                  {socketStatus === 'disconnected' &&
                    'Connection Failed, Retrying...'}
                </Text>
              </View>
            </View>

            {/* <Text /> */}
          </View>

          {!isLoading ? (
            <>
              <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.messagesList}
                onContentSizeChange={scrollToBottom}
                onLayout={scrollToBottom}
                removeClippedSubviews={false}
                showsVerticalScrollIndicator={false}
              />

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={newMessage}
                  onChangeText={setNewMessage}
                  placeholder="Type your message..."
                  multiline
                  editable={isConnected}
                  placeholderTextColor={Theme.COLORS.GREY}
                />
                <TouchableOpacity onPress={handleSendMessage}>
                  {/* <Text style={styles.sendButtonText}>
                  {isConnected ? 'Send' : 'Waiting...'}
                </Text> */}
                  <Image source={sendChat} style={styles.send_btn} />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={GLOBALSTYLE.activity_indicator_container_half}>
              <ActivityIndicator size="large" color={Theme.COLORS.DARK_BLUE} />
            </View>
          )}
        </View>
      </SafeAreaView>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

export default SingleMessage;
