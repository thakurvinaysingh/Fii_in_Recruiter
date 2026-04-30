import {StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH} from '../../store/ExternalLibrary';

const styles = StyleSheet.create({
  pop_bg: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  pop_box: {
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: RH(1),
    padding: RH(3.7),
    marginHorizontal: RH(3.7),
    width: '80%',
    position: 'relative',
  },
  text_area: {
    borderColor: Theme.COLORS.LIGHT_BLUE,
    borderWidth: RH(0.2),
    borderRadius: RH(1),
    marginTop: RH(1.7),
    height: RH(15),
    textAlignVertical: 'top',
    padding: RH(1),
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.7),
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
  },
  close_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3.2),
  },
  close_text_con: {
    bottom: RH(1.5),
  },
  close_img_con: {
    position: 'absolute',
    right: RH(1.7),
    top: RH(1.5),
  },
  vertical_space: {
    paddingVertical: RH(1),
  },
  btn_container: {
    padding: RH(1.8),
    alignItems: 'center',
  },
  button: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.8),
    color: Theme.COLORS.WHITE,
  },
});

export default styles;
