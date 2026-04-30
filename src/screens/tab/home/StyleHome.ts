import {StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH} from '../../../components/store/ExternalLibrary';

const styles = StyleSheet.create({
  profile_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(5),
    borderRadius: RH(30),
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RH(0.2),
  },
  profile: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(5),
    borderRadius: RH(4),
    borderColor: Theme.COLORS.LIGHT_BLUE,
    borderWidth: RH(0.2),
  },
  main_logo: {
    width: RH(20),
    height: RH(6),
  },
  notification_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3.3),
    right: RH(1),
  },
  red_button_container: {
    backgroundColor: Theme.COLORS.DARK_RED,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: RH(3),
    borderBottomLeftRadius: RH(3),
    paddingHorizontal: RH(1),
    paddingVertical: RH(1.6),
    elevation: RH(1),
    marginBottom: RH(1),
  },
  red_button_container_2: {
    backgroundColor: Theme.COLORS.LIGHT_RED,
    paddingHorizontal: RH(1),
    paddingVertical: RH(1.6),
    marginBottom: RH(1),
    borderRadius: RH(1),
  },
  search_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2),
    marginRight: RH(1),
  },
  header: {
    marginBottom: RH(1.3),
  },
  search_container: {
    // position: 'relative',
    height: RH(5.5),
    backgroundColor: Theme.COLORS.LIGHT_GREY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RH(1),
    borderRadius: RH(0.7),
  },
  search_input: {
    width: '90%',
    height: RH(1),
    paddingLeft: RH(1),
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
    fontSize: RH(1.9),
  },
  title_heading:{
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(3),
    color: Theme.COLORS.BLACK,
    paddingVertical: RH(2),
  },
  search_width: {
    width: '90%',
    backgroundColor: 'red',
  },
  container_bg: {
    backgroundColor: Theme.COLORS.EXTRA_LIGHT_BLUE,
    borderRadius: RH(1),
    justifyContent: 'center',
    padding: RH(4),
    marginTop: RH(3),
  },
  sucess_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3),
  },
  btn_transparent: {
    backgroundColor: Theme.COLORS.DARK_BLUE,
    paddingVertical: RH(1.9),
  },
  btn_text: {
    color: Theme.COLORS.WHITE,
  },
  btn_container: {
    paddingHorizontal: RH(5.8),
    paddingVertical: RH(1.8),
    alignItems: 'center',
  },
  btn_container_transparent: {
    paddingHorizontal: RH(5),
    paddingVertical: RH(1.8),
    alignItems: 'center',
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RH(0.2),
    borderRadius: RH(1),
    backgroundColor: Theme.COLORS.WHITE,
  },
  gradient: {
    borderRadius: RH(1),
  },
  button: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.6),
    color: Theme.COLORS.WHITE,
  },
  text_login: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.WHITE,
    fontSize: RH(1.7),
  },
  text_register: {
    fontSize: RH(1.6),
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
  },
  login_btn_container: {},
  mg_bottom: {
    // marginBottom: RH(1),
  },
  notification_count_box: {
    backgroundColor: Theme.COLORS.DARK_BLUE,
    height: RH(2.4),
    width: RH(2.4),
    borderRadius: RH(10),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: RH(1),
    left: RH(0.7),
  },
  unread_count_text: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.3),
    color: Theme.COLORS.WHITE,
  },
  find_candidate_text: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.GREY,
  },
});

export default styles;
