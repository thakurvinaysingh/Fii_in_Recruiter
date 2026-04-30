import {Platform, StyleSheet} from 'react-native';
import {RH, RW} from '../components/store/ExternalLibrary';
import Theme from './Theme';
const GLOBALSTYLE = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Theme.COLORS.WHITE,
  },
  container: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'ios' ? RH(2) : RH(2),
    paddingTop: Platform.OS === 'ios' ? RH(0) : RH(1.5),
    backgroundColor: Theme.COLORS.WHITE,
  },
  container_no_space: {
    flex: 1,
  },
  flex: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex_even_space: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_jobs: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'ios' ? RH(2) : RH(2),
    paddingTop: Platform.OS == 'ios' ? RH(0) : RH(1),
    backgroundColor: Theme.COLORS.WHITE,
  },

  just_flex: {
    flex: 1,
  },

  only_flex: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  gradient: {
    flex: 1,
  },
  upperSection: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mg_top_s: {
    marginTop: RH(3),
  },
  mg_top_xs: {
    marginTop: RH(1.7),
    // marginBottom: Platform.OS == 'ios' ? RH(2) : RH(5),
  },
  mg_top_xxs: {
    marginTop: RH(1),
  },
  mg_top_xxxs: {
    marginTop: RH(0.6),
  },
  mg_top_m: {
    marginTop: RH(8),
  },
  mg_top_m_main: {
    marginTop: RH(5),
  },

  mg_bottom_s: {
    marginBottom: RH(4),
  },
  mg_bottom_xs: {
    marginBottom: RH(1.5),
  },
  mg_bottom_xxs: {
    marginBottom: RH(1),
  },
  mg_bottom_xxxs: {
    marginBottom: RH(0.6),
  },
  mg_bottom_m: {
    marginBottom: RH(8),
  },
  introImg: {
    aspectRatio: 1,
    resizeMode: 'contain',
    maxHeight: RH(40),
  },
  bottomSection: {
    height: Platform.OS == 'ios' ? RH(39) : RH(37),
    backgroundColor: Theme.COLORS.WHITE,
    borderTopEndRadius: RW(12),
    borderTopStartRadius: RW(12),
    padding: RH(4),
    alignItems: 'center',
    top: Platform.OS == 'ios' ? RH(4) : RH(2),
  },
  authTitle: {
    fontFamily: Theme.FONT_FAMILY.EXTRA_BOLD,
    fontSize: RH(3.3),
    textAlign: 'center',
    color: Theme.COLORS.BLACK,
  },
  center: {
    justifyContent: 'center',
  },
  authTitle_medium: {
    fontFamily: Theme.FONT_FAMILY.EXTRA_BOLD,
    fontSize: RH(3),
    color: Theme.COLORS.BLACK,
  },
  authTitle_medium_2: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(2.7),
    color: Theme.COLORS.BLACK,
  },
  authTitle_medium_white: {
    fontFamily: Theme.FONT_FAMILY.EXTRA_BOLD,
    fontSize: RH(3),
    color: Theme.COLORS.WHITE,
  },
  authTitle_small: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(2.2),
    textAlign: 'center',
    color: Theme.COLORS.BLACK,
  },
  subTitle: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.BLACK,
    // lineHeight: RH(3.1),
  },
  subTitle_active: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.DARK_BLUE,
    lineHeight: RH(3.1),
  },
  activity_indicator_container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  activity_indicator_container_middle: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: RH(45),
    // backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  input_label_small: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.7),
  },
  activity_indicator_container_half: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    // backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    left: RH(2),
  },
  required: {
    color: Theme.COLORS.DARK_BLUE,
    fontSize: RH(2),
    fontFamily: Theme.FONT_FAMILY.EXTRA_BOLD,
  },
  error_text: {
    color: Theme.COLORS.RED,
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
  },
  subTitle_bold: {
    fontFamily: Theme.FONT_FAMILY.EXTRA_BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.BLACK,
    lineHeight: RH(3.1),
  },
  subTitle_with_no_linehieght: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.BLACK,
  },
  subTitle_white: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.WHITE,
    textAlign: 'center',
    // lineHeight: RH(3.1),
  },
  tost_text1_style: {
    color: Theme.COLORS.DARK_GREEN,
    fontSize: RH(2),
    fontFamily: Theme.FONT_FAMILY.EXTRA_BOLD,
  },
  tost_text1_style_error: {
    color: Theme.COLORS.RED,
    fontSize: RH(2),
    fontFamily: Theme.FONT_FAMILY.EXTRA_BOLD,
  },
  tost_text2_style: {
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.8),
    fontFamily: Theme.FONT_FAMILY.BOLD,
  },
  subTitleActive: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.DARK_BLUE,
    lineHeight: RH(3.1),
  },

  subTitleActive_small: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
    color: Theme.COLORS.DARK_BLUE,
    lineHeight: RH(3.1),
  },
  subTitle_grey: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.GREY,
  },
  subTitle_grey_bold: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.GREY,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    marginTop: RH(3),
  },
  paginationButton: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(4.5),
  },
  paginationDots: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(4),
  },
  auth_logo: {
    width: RH(27),
    height: RH(8),
    alignSelf: 'center',
  },
  input_label: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(2),
  },
  input_label_active: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.DARK_BLUE,
    fontSize: RH(2),
  },
  button: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(2),
    color: Theme.COLORS.WHITE,
  },
  button_black: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(2),
    color: Theme.COLORS.BLACK,
  },
  button_small: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.6),
    color: Theme.COLORS.WHITE,
  },
  text_right: {
    textAlign: 'right',
  },
  line: {
    width: '40%',
    height: RH(0.1),
    backgroundColor: Theme.COLORS.GREY,
  },
  social_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(9),
  },
  padding: {
    paddingHorizontal: RH(2),
  },
  check_box: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3),
  },
  gap_s: {
    gap: RH(1.2),
  },
  gap_ss: {
    gap: RH(2),
  },
  gap_m: {
    gap: RH(2.4),
  },
  gap_xs: {
    gap: RH(0.4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  only_row: {
    flexDirection: 'row',
  },
  row_flat: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  no_margin: {
    marginTop: 0,
  },
  bg_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(40),
    alignSelf: 'center',
    // marginTop: RH(3),
  },
  back_btn: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(2),
  },
  tab_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3.5),
  },
  small_title: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.7),
  },
  small_title_active: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.DARK_BLUE,
    fontSize: RH(1.7),
  },
  small_title_grey: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.GREY,
    fontSize: RH(1.7),
  },
  small_title_bigger_active: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.DARK_BLUE,
    fontSize: RH(1.7),
  },
  letter_space: {letterSpacing: 0.4},
  small_title_bigger: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.9),
  },

  small_text_active: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
    color: Theme.COLORS.DARK_BLUE,
  },
  italic_font: {
    fontStyle: 'italic',
    // fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
  },

  small_text_underline: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
    color: Theme.COLORS.DARK_BLUE,
    textDecorationLine: 'underline',
  },
  small_text_small_active: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.5),
    color: Theme.COLORS.DARK_BLUE,
  },

  medium_title: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(2.2),
  },
  medium_title_white: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.WHITE,
    fontSize: RH(2.2),
  },

  medium_title_red: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(2.0),
  },
  medium_title_red_1: {
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.6),
    marginTop: RH(1),
  },
  medium_title_red_2: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.WHITE,
    fontSize: RH(1.8),
    backgroundColor:Theme.COLORS.RED,
    borderRadius: RH(1),
    paddingVertical: RH(1),
    paddingHorizontal: RH(1),
    marginTop: RH(1),
    maxWidth: '75%',
    textAlign: 'center',
  },

  medium_title_active: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.DARK_BLUE,
    fontSize: RH(2.2),
  },
  small_text: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
    color: Theme.COLORS.BLACK,
  },
  small_text_small: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.5),
    color: Theme.COLORS.BLACK,
  },
  small_text_white: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
    color: Theme.COLORS.WHITE,
  },
  small_text_bigger: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.9),
    color: '#000',
  },
  small_text_bigger_white: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.9),
    color: '#F5F5F5',
  },
  small_text_red: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
    color: Theme.COLORS.RED,
  },
  small_text_green: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
    color: Theme.COLORS.DARK_GREEN,
  },
  small_text_italic: {
    // fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
    color: Theme.COLORS.BLACK,
    fontStyle: 'italic',
  },
  small_text_grey: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
    color: Theme.COLORS.GREY,
  },
  hr_line: {
    width: '100%',
    height: RH(0.2),
    backgroundColor: Theme.COLORS.MEMIUM_GREY,
  },
  btn_container: {
    padding: RH(2),
    alignItems: 'center',
  },
  btn_container_small: {
    padding: RH(1),
    alignItems: 'center',
  },
  small_btn_container: {
    padding: RH(1),
    alignItems: 'center',
    width: '80%',
  },
  small_button: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.6),
    color: Theme.COLORS.WHITE,
  },
  text_center: {
    textAlign: 'center',
  },
  dropdown_container: {
    backgroundColor: Theme.COLORS.EXTRA_LIGHT_BLUE,
    borderRadius: RH(1),
    borderColor: Theme.COLORS.BLUE,
    paddingHorizontal: RH(2),
    paddingVertical: RH(2),
  },
  dropdown_container_border: {
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: RH(1),
    borderColor: Theme.COLORS.BLUE,
    paddingHorizontal: RH(2),
    paddingVertical: RH(2),
    borderWidth: RH(0.2),
  },
  input_title: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.8),
    color: Theme.COLORS.BLACK,
  },
  input_title_grey: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.8),
    color: Theme.COLORS.GREY,
  },
  input_title_red: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.8),
    color: Theme.COLORS.RED,
  },
  share_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3),
  },
  profile_big: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(15),
    alignSelf: 'center',
    borderRadius: RH(30),
    borderWidth: RH(0.2),
    borderColor: Theme.COLORS.DARK_BLUE,
  },
  btn_container_smallone: {
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default GLOBALSTYLE;
