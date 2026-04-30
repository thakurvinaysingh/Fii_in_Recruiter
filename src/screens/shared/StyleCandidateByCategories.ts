import {StyleSheet} from 'react-native';
import {RH} from '../../components/store/ExternalLibrary';
import Theme from '../../theme/Theme';

const styles = StyleSheet.create({
  back_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(4),
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
  search_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(1.9),
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
    fontFamily: Theme.FONT_FAMILY.MEDIUM,
    fontSize: RH(1.9),
  },
});

export default styles;
