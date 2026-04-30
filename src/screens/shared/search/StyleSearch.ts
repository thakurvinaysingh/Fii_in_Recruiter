import {StyleSheet} from 'react-native';
import {RH} from '../../../components/store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  search_input: {
    width: '90%',
    height: RH(5.5),
    paddingLeft: RH(0.3),
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.9),
  },
  input_style_without_border: {
    paddingHorizontal: RH(2),
    // height: RH(6.4),
    // width: '100%',
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.8),
    borderRadius: RH(0.7),
    backgroundColor: Theme.COLORS.LIGHT_GREY,
  },
  input_style: {
    // borderColor: Theme.COLORS.BLUE,
    // borderWidth: RH(0.2),
    // padding: RH(2),
    paddingHorizontal: RH(2),
    // height: RH(6.8),
    width: '100%',
    color: Theme.COLORS.BLACK,
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(1.8),
    borderRadius: RH(0.7),
    backgroundColor: Theme.COLORS.LIGHT_GREY,
  },
  search_container: {
    position: 'relative',
    height: RH(5.5),
    backgroundColor: Theme.COLORS.LIGHT_GREY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RH(1.7),
    borderRadius: RH(0.7),
  },
  search_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2),
    marginRight: RH(1),
  },
  location_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.7),
  },
  small_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2.7),
  },
  small_close_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(1.4),
  },
  mg_top_xs: {
    marginTop: RH(1),
  },
  box: {
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    // width: '49%',
    flex: 1,
    // gap: RH(1),
    margin: RH(1),
    marginVertical: RH(1),
    borderRadius: RH(0.8),
    justifyContent: 'center',
    alignItems: 'center',
    padding: RH(1.5),
  },
});

export default styles;
