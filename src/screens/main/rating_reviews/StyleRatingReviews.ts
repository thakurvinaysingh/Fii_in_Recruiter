import {Platform, StyleSheet, Text, View} from 'react-native';
import {RH} from '../../../components/store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  mg_bottom: {
    // marginBottom: RH(10),
  },
  mg_vertical: {
    marginBottom: RH(2),
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
  profile_container: {
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    borderRadius: RH(1),
    padding: RH(2),
  },
  profile_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(8),
    marginRight: RH(1.7),
    borderRadius: RH(30),
  },
  category_container_parent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category_container: {
    flexDirection: 'row',
    backgroundColor: Theme.COLORS.LIGHT_GREY,
    paddingHorizontal: RH(1.5),
    paddingVertical: RH(1),
    borderRadius: RH(10),
    marginRight: RH(1),
    minWidth: RH(7),
    justifyContent: 'center',
  },
  category_container_active: {
    flexDirection: 'row',
    backgroundColor: Theme.COLORS.DARK_BLUE,
    paddingHorizontal: RH(1.5),
    paddingVertical: RH(1),
    borderRadius: RH(10),
    marginRight: RH(1),
    minWidth: RH(7),
    justifyContent: 'center',
  },
  mg_bottom_another: {
    marginBottom: Platform.OS == 'ios' ? RH(1) : RH(5),
  },
  btn_position: {
    position: 'absolute',
    bottom: RH(-7),
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: RH(1),
  },
  full_view: {
    // height: Platform.OS == 'ios' ? RH(80) : RH(87),
    // backgroundColor: 'red',
  },
});

export default styles;
