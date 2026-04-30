import {StyleSheet} from 'react-native';
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
    padding: RH(3),
    marginHorizontal: RH(3.7),
    width: '80%',
    position: 'relative',
  },
  btn_transparent: {
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RH(0.2),
    paddingVertical: RH(1.7),
  },
  btn_text: {
    color: Theme.COLORS.RED,
  },
});

export default styles;
