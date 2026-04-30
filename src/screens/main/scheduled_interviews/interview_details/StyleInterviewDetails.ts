import {StyleSheet} from 'react-native';
import {RH} from '../../../../components/store/ExternalLibrary';
import Theme from '../../../../theme/Theme';

const styles = StyleSheet.create({
  main_container: {
    marginTop: RH(2),
    marginBottom: RH(6),
  },
  details_container: {
    marginVertical: RH(1.6),
  },
  detail_box: {
    borderColor: Theme.COLORS.MEMIUM_GREY,
    borderWidth: RH(0.2),
    borderRadius: RH(1),
    padding: RH(1.6),
  },
  activity_indicator_container_half: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  small_text_yellow: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.DARK_YELLOW,
  },
  small_text_green: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.DARK_GREEN,
  },
  small_text_blue: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.DARK_BLUE,
  },
  eye_small: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3),
  },
  small_text_black: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.BLACK,
  },
  small_text_red: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.9),
    color: Theme.COLORS.RED,
  },

  edit_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(4),
  },
  btn_transparent: {
    borderRadius: RH(1.5),
    backgroundColor: Theme.COLORS.WHITE,
    borderColor: Theme.COLORS.DARK_GREEN,
    borderWidth: RH(0.2),
    paddingVertical: RH(1.9),
    marginBottom: RH(2),
  },
  btn_text: {
    color: Theme.COLORS.DARK_GREEN,
  },
  profile_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(9),
  },
  img_bg: {
    height: RH(5),
    width: RH(5),
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    borderRadius: RH(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_style: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(2.2),
  },
});

export default styles;
