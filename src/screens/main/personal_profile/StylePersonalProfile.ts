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
  edit_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(4),
    position: 'absolute',
    right: '-6%',
    top: RH(10),
  },
  calendar_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.6),
  },
  date_picker_container: {
    backgroundColor: Theme.COLORS.BLUE,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: 0,
    borderRadius: RH(1),
    width: '86%',
  },
  picker_text: {
    color: Theme.COLORS.WHITE,
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
    fontSize: RH(1.7),
  },
  cancel_con: {
    backgroundColor: Theme.COLORS.RED,
    padding: RH(0.6),
    borderRadius: RH(0.4),
  },
  confirm_con: {
    backgroundColor: Theme.COLORS.DARK_GREEN,
    padding: RH(0.6),
    borderRadius: RH(0.4),
  },
  date_picker_box: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    gap: RH(2),
    right: RH(1),
    top: RH(1),
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
    marginBottom: Platform.OS == 'ios' ? RH(4) : RH(6.5),
  },
  gallery_icon_real: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(14),
    borderRadius: RH(0.2),
  },
});

export default styles;
