import {StyleSheet} from 'react-native';
import {RH} from '../../store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  box: {
    borderRadius: RH(1),
    borderColor: Theme.COLORS.MEMIUM_GREY,
    borderWidth: RH(0.2),
    padding: RH(1),
    marginBottom: RH(2),
    // position: 'relative',
  },
  gap: {
    gap: RH(2),
  },
  delete_view: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(6),
    borderRadius: RH(30),
  },
  small_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(1.7),
    marginRight: RH(0.7),
  },
  small_img1: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(2.6),
  },
  small_img2: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.2),
    marginRight: RH(0.7),
  },
  space: {
    marginRight: RH(1.3),
  },
});

export default styles;
