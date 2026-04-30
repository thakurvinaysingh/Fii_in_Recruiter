import {Platform, StyleSheet} from 'react-native';
import {RH, RW} from '../../../../components/store/ExternalLibrary';
import Theme from '../../../../theme/Theme';

const styles = StyleSheet.create({
  profile_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(5),
    borderRadius: RH(30),
  },
  main_logo: {
    width: RH(20),
    height: RH(6),
  },
  back_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(4),
  },
  save_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3),
  },
  btn_transparent: {
    borderRadius: RH(1),
    backgroundColor: Theme.COLORS.WHITE,
    borderColor: Theme.COLORS.GREY,
    borderWidth: RH(0.2),
    paddingVertical: RH(1.7),
  },
  edit_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3.5),
  },

  btn_transparent_grey: {
    borderRadius: RH(1.5),
    backgroundColor: Theme.COLORS.WHITE,
    borderColor: Theme.COLORS.GREY,
    borderWidth: RH(0.2),
    paddingVertical: RH(1.9),
  },
  btn_text: {
    color: Theme.COLORS.GREY,
  },
  btn_text_grey: {
    color: Theme.COLORS.GREY,
  },
  job_card_container: {
    marginVertical: RH(4),
  },
  job_card: {
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    padding: RH(1.5),
    borderRadius: RH(1.5),
  },
  clinic_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(8),
    borderRadius: RH(2),
    // borderColor: Theme.COLORS.DARK_BLUE,
    // borderWidth: RH(0.2),
  },
  location_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.6),
  },
  hr_gap: {
    marginVertical: RH(1.6),
  },
  multiplebox_card: {
    marginVertical: RH(0.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Platform.OS == 'ios' ? RH(0.7) : RH(1),
  },
  box: {
    borderRadius: RH(1),
    borderWidth: RH(0.2),
    borderColor: Theme.COLORS.MEMIUM_GREY,
    paddingHorizontal: RH(0.7),
    paddingVertical: RH(1.5),
    alignItems: 'center',
    width: RH(12.5),
  },
  box_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(7),
  },
  description_area: {
    alignItems: 'flex-start',
  },
  check_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3.2),
  },
  text_width: {
    width: '90%',
  },
  wrap_text: {
    flexWrap: 'wrap',
  },
  clinic_card: {
    borderColor: Theme.COLORS.GREY,
    borderWidth: RH(0.2),
    width: '100%',
    padding: RH(1),
    borderRadius: RH(1),
    borderStyle: 'dashed',
  },
  clinic_desc: {
    width: RH(27),
  },
  web_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3.5),
  },
  arrow_right: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2),
    marginTop: RW(1),
  },
  text_left: {
    textAlign: 'left',
    flex: 1,
  },
  radius_box_white: {
    backgroundColor: Theme.COLORS.EXTRA_LIGHT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RH(1.5),
    paddingHorizontal: RH(2.7),
    paddingVertical: RH(1.3),
    marginHorizontal: RH(0.7),
    marginVertical: RH(0.5),
  },
  mg_top: {
    marginTop: RH(0.4),
  },
});

export default styles;
