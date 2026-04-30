import {Platform, StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH, RW} from '../../store/ExternalLibrary';

const styles = StyleSheet.create({
  pop_bg: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  pop_box: {
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: RH(1),
    padding: RH(3.7),
    marginHorizontal: RH(3.7),
    width: '80%',
    position: 'relative',
  },
  btn_container: {
    padding: Platform.OS == 'ios' ? RH(1.8) : RH(1.5),
    alignItems: 'center',
  },
  logout_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(9),
    alignSelf: 'center',
  },
  close_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3.5),
  },
  close_img_container: {
    left: Platform.OS == 'ios' ? RH(27.5) : RH(28),
    top: RH(-10),
    width: '10%',
  },
  btn_transparent: {
    borderWidth: RH(0.2),
    borderColor: Theme.COLORS.RED,
    backgroundColor: 'transparent',
    paddingVertical: RH(1.6),
  },
  btn_text: {
    color: Theme.COLORS.RED,
  },
});

export default styles;
