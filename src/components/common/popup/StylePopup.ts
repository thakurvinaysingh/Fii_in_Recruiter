import {StyleSheet, Text, View} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH} from '../../store/ExternalLibrary';

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
    minWidth: '82%',
  },
  success_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(10),
    alignSelf: 'center',
  },
});

export default styles;
