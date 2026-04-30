import {Platform, StyleSheet, Text, View} from 'react-native';
import {RH} from '../../../components/store/ExternalLibrary';
import Theme from '../../../theme/Theme';

const styles = StyleSheet.create({
  search_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(2),
  },
  search_container: {
    position: 'relative',
    height: RH(5.5),
    backgroundColor: Theme.COLORS.LIGHT_GREY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RH(1),
    borderRadius: RH(0.7),
  },
  search_input: {
    width: '90%',
    height: RH(5.5),
    paddingLeft: RH(1),
    fontFamily: Theme.FONT_FAMILY.SEMI_BOLD,
    fontSize: RH(1.9),
  },
  container: {
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    padding: RH(2),
    borderRadius: RH(1),
  },
  box: {
    borderRadius: RH(1),
    borderWidth: RH(0.2),
    borderColor: Theme.COLORS.BLUE,
    backgroundColor: Theme.COLORS.WHITE,
    height: RH(13),
    width: '47%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box_active: {
    borderRadius: RH(1),
    borderWidth: RH(0.2),
    borderColor: Theme.COLORS.DARK_BLUE,
    backgroundColor: Theme.COLORS.DARK_BLUE,
    height: RH(13),
    width: '47%',
    justifyContent: 'center',
    alignItems: 'center',
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
  mg_bottom: {
    marginBottom: Platform.OS == 'ios' ? RH(10) : RH(12),
  },
});

export default styles;
