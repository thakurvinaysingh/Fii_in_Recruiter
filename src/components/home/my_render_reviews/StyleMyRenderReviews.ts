import {StyleSheet, Text, View} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH} from '../../store/ExternalLibrary';

const styles = StyleSheet.create({
  box: {
    backgroundColor: Theme.COLORS.WHITE,
    marginBottom: RH(1.3),
    borderRadius: RH(1),
    paddingHorizontal: RH(1.5),
    paddingVertical: RH(2),
    borderColor: Theme.COLORS.MEMIUM_GREY,
    borderWidth: RH(0.2),
  },
  star: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.3),
  },
  stars_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dentist_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(7),
    marginRight: RH(1.6),
    borderRadius: RH(30),
  },
});

export default styles;
