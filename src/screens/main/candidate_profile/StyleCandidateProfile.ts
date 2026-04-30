import {StyleSheet, Text, View} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH, RW} from '../../../components/store/ExternalLibrary';

const styles = StyleSheet.create({
  flex_wrap: {
    flexWrap: 'wrap',
  },
  stars_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RW(0.3),
    borderRadius: RH(1),
    alignItems: 'center',
    width: '31.3%',
    height: RH(20),
    padding: RH(1),
  },
  box_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(6),
    marginBottom: RH(1),
  },
  box_experties: {
    borderRadius: RH(1),
    borderWidth: RW(0.3),
    borderColor: Theme.COLORS.BLUE,
    width: '48%',
    margin: RH(0.5),
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    padding: RH(1),
  },
  expertise_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(5),
    marginRight: RH(1),
  },
  img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(6),
    marginRight: RH(2),
  },
  mg_bottom: {
    marginBottom: RH(4),
  },
  btn_container: {},
  app_status_container: {},
  status_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3.8),
    marginRight: RH(1),
  },
  progress_line: {
    height: RH(3),
    width: RH(0.3),
    backgroundColor: Theme.COLORS.LIGHT_GREY,
    left: RH(1.7),
  },
  mg_top: {
    marginTop: RH(0.7),
  },
  ellips_small: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.4),
  },
  grey_box: {
    backgroundColor: Theme.COLORS.EXTRA_LIGHT_BLUE,
    padding: RH(1.5),
    borderRadius: RH(1),
  },
  box_container: {
    flexWrap: 'wrap',
  },
  right_small: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3),
  },
  location_small: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3),
  },
  star: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.3),
  },
  boolean_box: {
    borderRadius: RH(1.5),
    borderColor: Theme.COLORS.MEMIUM_GREY,
    borderWidth: RH(0.2),
    paddingLeft: RH(1.3),
    paddingRight: RH(2.3),
    paddingVertical: RH(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time_box: {
    borderRadius: RH(1.5),
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    paddingLeft: RH(1.3),
    paddingRight: RH(2.3),
    paddingVertical: RH(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: RH(0.4),
  },
  left_text_width: {
    width: '91%',
  },
});

export default styles;
