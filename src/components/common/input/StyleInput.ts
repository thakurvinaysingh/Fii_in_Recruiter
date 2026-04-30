import {StyleSheet, Text, View} from 'react-native';
import Theme from '../../../theme/Theme';
import {RF, RH} from '../../store/ExternalLibrary';

const styles = StyleSheet.create({
  parant: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input_style_without_border_center: {
    paddingHorizontal: RH(2),
    height: RH(6.4),
    width: '100%',
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.8),
    borderRadius: RH(1.2),
    backgroundColor: Theme.COLORS.EXTRA_LIGHT_BLUE,
    textAlign: 'center',
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
  eye: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(4),
    right: RH(6),
    alignItems: 'center',
  },
});

export default styles;
