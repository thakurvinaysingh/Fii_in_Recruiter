import {StyleSheet} from 'react-native';
import {RH} from '../../../components/store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  search_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.1),
    marginRight: RH(1),
  },
  search_container: {
    position: 'relative',
    height: RH(5.5),
    backgroundColor: Theme.COLORS.LIGHT_GREY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RH(1),
    borderRadius: RH(0.7),
  },
  search_input: {
    width: '90%',
    height: RH(5.5),
    paddingLeft: RH(0.3),
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.GREY,
  },
  category_container: {
    flexDirection: 'row',
    backgroundColor: Theme.COLORS.LIGHT_GREY,
    paddingHorizontal: RH(1.5),
    paddingVertical: RH(1),
    borderRadius: RH(10),
    marginRight: RH(1),
    minWidth: RH(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  category_container_active: {
    backgroundColor: Theme.COLORS.DARK_BLUE,
    paddingHorizontal: RH(1.5),
    paddingVertical: RH(1.5),
    borderRadius: RH(10),
    marginRight: RH(1),
    minWidth: RH(7),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  category_container_parent: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  filter_active_container: {
    backgroundColor: Theme.COLORS.LIGHT_GREY,
    padding: RH(2),
  },
  chat_profile: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(6),
  },
  text_container: {
    marginLeft: RH(2),
  },
  message_desc: {
    marginRight: RH(7),
  },
  benifits_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2),
    marginLeft: RH(0.5),
  },
  time_text: {
    left: RH(6),
  },
  mg_space: {
    paddingBottom: RH(42),
    // backgroundColor: 'red',
  },

  container: {flex: 1, backgroundColor: 'transparent'},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'flex-start',
  },
  profile_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(6),
    borderRadius: RH(30),
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  connectionStatus: {
    textAlign: 'center',
    color: 'orange',
    fontSize: 12,
  },
  messagesList: {
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageContent: {
    maxWidth: '70%',
    padding: RH(1),
    borderRadius: 10,
  },
  myMessageContent: {
    backgroundColor: Theme.COLORS.DARK_BLUE,
    marginLeft: RH(0.7),
  },
  otherMessageContent: {
    backgroundColor: '#ECECEC',
    marginRight: RH(0.7),
  },

  messageText: {
    fontSize: 1,
  },
  timeText: {
    fontSize: RH(1.4),
    color: Theme.COLORS.WHITE,
    marginTop: RH(0.3),
    alignSelf: 'flex-end',
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
  },
  timeTextOther: {
    fontSize: RH(1.4),
    color: Theme.COLORS.GREY,
    marginTop: RH(0.3),
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
  },
  failedText: {
    color: 'red',
    fontSize: 12,
  },
  statusIndicator: {
    marginLeft: 5,
  },
  sendButton: {
    // padding: 10,
    backgroundColor: '#007AFF',
    // borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  single_chat_container: {},
  chat_img: {
    aspectRatio: 1,
    width: RH(7),
    resizeMode: 'contain',
    borderRadius: RH(30),
  },
  mg_bottom: {
    marginBottom: RH(17),
  },
  no_notification_box: {
    justifyContent: 'center',
    alignItems: 'center',
    top: RH(20),
    gap: RH(1.8),
  },
  notification_big_style: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(9),
  },
  round_box: {
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    height: RH(17),
    width: RH(17),
    borderRadius: RH(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_width: {
    width: '90%',
    lineHeight: RH(2.9),
  },
  send_btn: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(4.5),
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: RH(0.5),
    paddingHorizontal: RH(1),
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  otherMessageRow: {
    justifyContent: 'flex-start',
  },

  chatProfileImage: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3),
    borderRadius: RH(20),
  },

  chatBubble: {
    maxWidth: '75%',
    padding: RH(1),
    borderRadius: RH(2),
  },
  myChatBubble: {
    backgroundColor: Theme.COLORS.DARK_BLUE,
    borderTopRightRadius: 0,
  },
  otherChatBubble: {
    backgroundColor: '#F1F1F1',
    borderTopLeftRadius: 0,
  },

  chatText: {},
  myChatText: {
    color: 'white',
  },
  otherChatText: {
    color: '#333',
  },

  chatTimestamp: {
    fontSize: RH(1.4),
    color: '#999',
    alignSelf: 'flex-end',
    marginTop: RH(0.5),
  },

  dateLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: RH(2),
  },
  dateLine: {
    height: 1,
    flex: 1,
    backgroundColor: '#ccc',
    marginHorizontal: RH(1),
  },
  dateLabel: {
    fontSize: RH(1.6),
    color: '#888',
  },

  // Input & Button styling
  inputContainer: {
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RH(0.2),
    borderRadius: RH(2),
    paddingHorizontal: RH(1),
    paddingVertical: RH(0.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RH(1),
  },
  input: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    paddingLeft: RH(0.6),
    width: '87%',
    maxHeight: RH(10),
  },
  unread_count_box: {
    backgroundColor: Theme.COLORS.DARK_BLUE,
    width: RH(2.6),
    height: RH(2.6),
    borderRadius: RH(30),
    justifyContent: 'center',
    alignItems: 'center',
    left: RH(2),
    top: RH(0.3),
  },
  count_text: {
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
    fontSize: RH(1.2),
    color: Theme.COLORS.WHITE,
  },
});
export default styles;
