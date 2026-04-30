import {StyleSheet} from 'react-native';
import {RH} from '../../store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  bottom_sheet: {
    // borderTopRightRadius: RH(4),
    // borderTopLeftRadius: RH(4),
    // backgroundColor: Theme.COLORS.LIGHT_GREY,
    // borderColor: Theme.COLORS.BLACK,
    // borderWidth: RH(0.2),
    // height: '100%',
    marginBottom: RH(5),
  },
  center: {
    justifyContent: 'center',
    paddingVertical: RH(1.4),
  },
  btn_transparent: {
    // borderWidth: RH(0.2),
    // borderColor: Theme.COLORS.RED,
    backgroundColor: Theme.COLORS.DARK_BLUE,
    paddingVertical: RH(1.9),
  },
  btn_transparent_fade: {
    backgroundColor: Theme.COLORS.MEMIUM_GREY,
    paddingVertical: RH(1.9),
  },
  btn_text: {
    color: Theme.COLORS.WHITE,
  },
  star_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(5),
  },
  photo_box: {
    borderRadius: RH(1),
    alignSelf: 'flex-start',
    height: RH(12),
    width: RH(14),
    justifyContent: 'center',
    alignItems: 'center',
    gap: RH(0.6),
    marginTop: RH(2),
    position: 'relative',
  },
  box: {
    borderRadius: RH(1),
    borderColor: Theme.COLORS.MEMIUM_GREY,
    borderWidth: RH(0.2),
    alignSelf: 'flex-start',
    height: RH(12),
    width: RH(14),
    justifyContent: 'center',
    alignItems: 'center',
    gap: RH(0.6),
    marginTop: RH(2),
    position: 'relative',
  },
  added_img: {
    height: RH(11),
    width: '100%',
    borderRadius: RH(1),
    zIndex: -1,
  },
  camera_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(5.5),
    alignSelf: 'center',
  },
  close_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3),
    position: 'absolute',
    top: RH(-0.8),
    right: RH(-10.2),
  },
  width: {
    paddingHorizontal: RH(5),
  },
  input_area: {
    height: RH(25),
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: RH(1),
    borderColor: Theme.COLORS.MEMIUM_GREY,
    borderWidth: RH(0.2),
    padding: RH(1.7),
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.8),
    textAlignVertical: 'top',
  },
  input_area_red: {
    height: RH(25),
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: RH(1),
    borderColor: Theme.COLORS.RED,
    borderWidth: RH(0.2),
    padding: RH(1.7),
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.8),
    textAlignVertical: 'top',
  },
});

export default styles;
