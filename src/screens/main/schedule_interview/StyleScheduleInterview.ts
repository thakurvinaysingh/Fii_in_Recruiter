import {StyleSheet, Text, View} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH} from '../../../components/store/ExternalLibrary';

const styles = StyleSheet.create({
  profile_container: {
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    borderRadius: RH(1),
    padding: RH(2),
  },
  profile_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(9),
    marginRight: RH(1.7),
    borderRadius: RH(30),
  },
  mg_bottom: {
    marginBottom: RH(2),
  },
  star_yellow: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.3),
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
  img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(6),
  },
  input_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.7),
    marginRight: RH(1),
  },
  mg_bottom_another: {
    marginBottom: RH(6),
  },
  input_area: {
    height: RH(25),
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: RH(1),
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RH(0.2),
    padding: RH(1),
    fontFamily: Theme.FONT_FAMILY.BOLD,
    color: Theme.COLORS.BLACK,
    fontSize: RH(1.8),
    textAlignVertical: 'top',
  },
  container_mg_bottom: {
    marginBottom: RH(2),
  },
  date_picker_container: {
    backgroundColor: Theme.COLORS.GREY,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    bottom: RH(0.4),
    borderRadius: RH(1),
    width: '93%',
  },
  date_picker_box: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    gap: RH(2),
    right: RH(1),
    top: RH(1),
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
  picker_text: {
    color: Theme.COLORS.WHITE,
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
    fontSize: RH(1.7),
  },
});

export default styles;
