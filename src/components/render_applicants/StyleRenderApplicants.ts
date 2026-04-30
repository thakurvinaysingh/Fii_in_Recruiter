import {StyleSheet} from 'react-native';
import {RH, RW} from '../store/ExternalLibrary';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  box: {
    borderRadius: RH(1),
    borderColor: Theme.COLORS.MEMIUM_GREY,
    borderWidth: RH(0.2),
    marginBottom: RH(2),
    padding: RH(2),
  },
  profile_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(7.5),
    borderRadius: RH(30),
  },
  status_box_green: {
    borderRadius: RH(10),
    backgroundColor: Theme.COLORS.LIGHT_GREEN,
    paddingHorizontal: RH(1.5),
    paddingVertical: RH(0.7),
    minWidth: RH(7),
    alignItems: 'center',
    borderWidth: RW(0.3),
    borderColor: Theme.COLORS.DARK_GREEN,
  },
  status_box_yellow: {
    borderRadius: RH(10),
    backgroundColor: Theme.COLORS.LIGHT_YELLOW,
    paddingHorizontal: RH(1.5),
    paddingVertical: RH(0.7),
    minWidth: RH(7),
    alignItems: 'center',
    borderWidth: RW(0.3),
    borderColor: Theme.COLORS.DARK_YELLOW,
  },
  status_box_blue: {
    borderRadius: RH(10),
    backgroundColor: Theme.COLORS.EXTRA_LIGHT_BLUE,
    paddingHorizontal: RH(1.5),
    paddingVertical: RH(0.7),
    minWidth: RH(7),
    alignItems: 'center',
    borderWidth: RW(0.3),
    borderColor: Theme.COLORS.DARK_BLUE,
  },
  small_text_yellow: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
    color: Theme.COLORS.DARK_YELLOW,
  },
  small_text_green: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
    color: Theme.COLORS.DARK_GREEN,
  },
  small_text_blue: {
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.7),
    color: Theme.COLORS.DARK_BLUE,
  },
});

export default styles;
