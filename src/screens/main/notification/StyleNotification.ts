import {Platform, StyleSheet} from 'react-native';
import {RH} from '../../../components/store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  no_notification_box: {
    justifyContent: 'center',
    alignItems: 'center',
    top: RH(20),
    gap: RH(1.8),
  },
  notification_big_style: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(9),
  },
  round_box: {
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    height: RH(17),
    width: RH(17),
    borderRadius: RH(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_width: {
    width: '90%',
    lineHeight: RH(2.9),
  },
  mg_bottom: {
    marginBottom: Platform.OS == 'ios' ? RH(4) : RH(6),
  },
});

export default styles;
