import {StyleSheet} from 'react-native';
import {RH} from '../../../components/store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  input_style_without_border: {
    paddingHorizontal: RH(2),
    height: RH(6.4),
    width: '100%',
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.8),
    borderRadius: RH(1.2),
    backgroundColor: Theme.COLORS.LIGHT_GREY,
  },
});

export default styles;
