import {Platform, StyleSheet} from 'react-native';
import {RH} from '../../../components/store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  profile_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(14),
    borderRadius: RH(15),
    alignSelf: 'center',
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RH(0.2),
  },
  input_style: {
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RH(0.2),
    paddingHorizontal: RH(2),
    height: RH(6.8),
    width: '100%',
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.8),
    borderRadius: RH(1.2),
    backgroundColor: Theme.COLORS.WHITE,
  },
  input_area: {
    height: RH(15),
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: RH(1),
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RH(0.2),
    padding: RH(2),
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.8),
    textAlignVertical: 'top',
  },
  edit_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(4),
    position: 'absolute',
    right: RH(0.6),
    top: RH(9),
  },
  dropdown_container: {
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: RH(1),
    borderWidth: RH(0.2),
    borderColor: Theme.COLORS.BLUE,
    paddingHorizontal: RH(2),
    height: RH(20),
    justifyContent: 'center',
  },
  gallery_icon: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3),
  },
  text_img_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mg_bottom: {
    marginBottom: Platform.OS == 'ios' ? RH(3.7) : RH(6),
  },
  gallery_icon_real: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(14),
    borderRadius: RH(0.2),
  },
  center: {
    alignItems: 'center',
    marginTop: RH(4),
    alignSelf: 'center',
    width: RH(20),
  },
});

export default styles;
