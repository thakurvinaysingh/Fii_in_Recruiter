import {Platform, StyleSheet, Text, View} from 'react-native';
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
    zIndex: 9999,
  },
  pop_box: {
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: RH(1),
    padding: RH(3.7),
    marginHorizontal: RH(3.7),
    width: '80%',
    position: 'relative',
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
    left: Platform.OS == 'ios' ? RH(27) : RH(30),
    top: RH(-2),
    width: '10%',
  },
  btn_transparent: {
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RW(0.5),
    paddingVertical: RH(1.1),
  },
});

export default styles;
