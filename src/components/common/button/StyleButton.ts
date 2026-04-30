import {StyleSheet} from 'react-native';
import {RH} from '../../store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  gradient: {
    borderRadius: RH(1),
  },
  button_container: {
    padding: RH(2),
    alignItems: 'center',
  },
  transparent_button: {
    borderRadius: RH(1),
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  transparent_btn_text: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.9),
  },
  call_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3),
  },
  camera_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3),
  },
});

export default styles;
