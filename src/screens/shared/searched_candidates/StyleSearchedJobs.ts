import {StyleSheet, Text, View} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH} from '../../../components/store/ExternalLibrary';

const styles = StyleSheet.create({
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
  filter_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    height: RH(3.5),
  },
});
export default styles;
