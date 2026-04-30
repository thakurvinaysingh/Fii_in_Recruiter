import {StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH} from '../../store/ExternalLibrary';

const styles = StyleSheet.create({
  notification_box: {
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    marginBottom: RH(1.3),
    borderRadius: RH(1),
    flexDirection: 'row',
    padding: RH(1.6),
    alignItems: 'center',
  },
  notification_box_white: {
    backgroundColor: Theme.COLORS.WHITE,
    marginBottom: RH(1.3),
    borderRadius: RH(1),
    flexDirection: 'row',
    padding: RH(1.6),
    alignItems: 'center',
  },
  noti_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(6),
    borderRadius: RH(40),
  },
  mg_bottom: {
    marginBottom: RH(3),
  },
  text_width: {
    // width: '57%',
  },
});

export default styles;
