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
  main_logo: {
    width: RH(20),
    height: RH(6),
  },
  notification_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3.3),
  },
  search_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.4),
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
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.9),
  },
  search_width: {
    width: '90%',
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
  input_style_without_border: {
    paddingHorizontal: RH(2),
    // height: RH(6.4),
    // width: '100%',
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.8),
    borderRadius: RH(0.7),
    backgroundColor: Theme.COLORS.LIGHT_GREY,
  },
});

export default styles;
