import {StyleSheet} from 'react-native';
import {RH, RW} from '../../store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  box: {
    borderRadius: RH(1),
    borderColor: Theme.COLORS.MEMIUM_GREY,
    borderWidth: RW(0.3),
    padding: RH(1.5),
    // marginRight: RH(1),
    marginBottom: RH(2),
  },
  recent_app_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(8),
  },
  gap: {
    marginLeft: RH(1),
  },
  exp_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2),
    marginRight: RH(0.5),
  },
  star_yellow_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.3),
  },
  profile_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(7),
    borderRadius: RH(30),
  },
  small_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.5),
  },
  mg_right: {
    marginLeft: RH(0.7),
  },
  bigger_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3.3),
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
});

export default styles;
