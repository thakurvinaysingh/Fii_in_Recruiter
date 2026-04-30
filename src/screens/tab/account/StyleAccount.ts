import {StyleSheet} from 'react-native';
import {RH} from '../../../components/store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  profile_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(14),
    alignSelf: 'center',
    borderRadius: RH(30),
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RH(0.2),
  },
  parent_circle: {
    height: RH(1.3),
    backgroundColor: 'red',
    // borderRadius: '100%',
  },
  child_circle: {
    width: RH(11.3),
    height: RH(10.3),
    borderColor: 'black',
    borderWidth: 5,
    alignSelf: 'center',
    // backgroundColor: Theme.COLORS.DARK_YELLOW,
    borderRadius: '100%',
    // padding: RH(2),
    position: 'absolute',
  },
  mg_bottom: {
    marginBottom: RH(3),
  },
});

export default styles;
