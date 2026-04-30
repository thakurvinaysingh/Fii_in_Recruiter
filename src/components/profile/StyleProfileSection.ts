import {StyleSheet, Text, View} from 'react-native';
import Theme from '../../theme/Theme';
import {RH} from '../store/ExternalLibrary';

const styles = StyleSheet.create({
  box: {
    borderRadius: RH(1),
    borderWidth: RH(0.2),
    borderColor: Theme.COLORS.MEMIUM_GREY,
    padding: RH(1),
    marginBottom: RH(2),
  },

  icon_container: {
    backgroundColor: Theme.COLORS.LIGHT_GREY,
    borderRadius: RH(10),
    padding: RH(1),
    marginRight: RH(2),
  },
  right_arrow: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3),
  },
  icon: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(2.7),
  },
  input_area: {
    height: RH(25),
    backgroundColor: Theme.COLORS.EXTRA_LIGHT_BLUE,
    borderRadius: RH(1),
    padding: RH(1.7),
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.8),
    textAlignVertical: 'top',
  },
  lable_box: {
    backgroundColor: Theme.COLORS.EXTRA_LIGHT_BLUE,
    borderRadius: RH(1),
    paddingHorizontal: RH(1.5),
    paddingVertical: RH(2),
  },
  input_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.7),
    marginRight: RH(1),
  },
  calender_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3),
  },
  input_style: {
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RH(0.2),
    // padding: RH(2),
    paddingHorizontal: RH(2),
    height: RH(6.8),
    width: '100%',
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.8),
    borderRadius: RH(1.2),
    backgroundColor: Theme.COLORS.WHITE,
  },

  input_style_without_border: {
    paddingHorizontal: RH(2),
    height: RH(6.4),
    width: '100%',
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.8),
    borderRadius: RH(1.2),
    backgroundColor: Theme.COLORS.EXTRA_LIGHT_BLUE,
  },
  dropdown_container: {
    backgroundColor: Theme.COLORS.EXTRA_LIGHT_BLUE,
    borderRadius: RH(1),
    borderColor: Theme.COLORS.BLUE,
    paddingHorizontal: RH(2),
    height: RH(10),
    justifyContent: 'center',
  },
  text_img_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gallery_icon: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3),
  },
  selection_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.7),
  },
  half_area: {
    width: '48%',
  },
  full_area: {
    width: '100%',
    marginBottom: RH(1),
  },
});

export default styles;
