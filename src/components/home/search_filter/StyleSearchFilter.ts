import {StyleSheet} from 'react-native';
import {RH} from '../../store/ExternalLibrary';

const styles = StyleSheet.create({
  filter_container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  left_margin: {
    // margin: RH(2),
  },
  selection_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.7),
  },
});
export default styles;
