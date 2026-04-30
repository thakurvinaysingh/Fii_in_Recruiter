import {StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH} from '../../../components/store/ExternalLibrary';

const styles = StyleSheet.create({
  profile_container: {
    backgroundColor: Theme.COLORS.LIGHT_BLUE,
    borderRadius: RH(1),
    padding: RH(2),
  },
  mg_bottom: {
    marginBottom: RH(2),
  },
  profile_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(8),
    marginRight: RH(1.7),
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
  category_container_parent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  height: {
    height: RH(57),
  },
  mg_vertical: {
    marginBottom: RH(5),
  },
});

export default styles;
