import {StyleSheet} from 'react-native';
import {RH, RW} from '../../store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  dropdown_img_180: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(1.8),
    alignSelf: 'flex-end',
    transform: [{rotate: '180deg'}],
  },
  gradient_con: {
    borderRadius: RH(1),
    width: '45%',
    margin: RH(1),
  },
  dropdown_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2),
    alignSelf: 'flex-end',
  },
  dropdown_box: {
    backgroundColor: Theme.COLORS.EXTRA_LIGHT_BLUE,
    padding: RH(1),
    borderRadius: RH(1),
    borderColor: Theme.COLORS.BLUE,
    maxHeight: RH(20),
    overflow: 'scroll',
    marginTop: RH(0.2),
  },
  dropdown_box_border: {
    backgroundColor: Theme.COLORS.WHITE,
    padding: RH(1),
    borderRadius: RH(1),
    borderColor: Theme.COLORS.BLUE,
    maxHeight: RH(20),
    overflow: 'scroll',
    marginTop: RH(0.2),
    borderWidth: RH(0.2),
  },

  border_bottom: {
    borderBottomColor: Theme.COLORS.MEMIUM_GREY,
    borderBottomWidth: RW(0.3),
    marginVertical: RH(0.7),
  },
});

export default styles;
