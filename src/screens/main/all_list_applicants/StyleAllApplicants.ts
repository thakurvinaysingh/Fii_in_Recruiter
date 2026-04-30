import {StyleSheet} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH} from '../../../components/store/ExternalLibrary';

const styles = StyleSheet.create({
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
  mg_bottom: {
    paddingBottom: RH(0),
  },
  mg_bottom_main:{
    paddingBottom: RH(0),
    marginTop: RH(2),
  },
   activity_indicator_container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});

export default styles;
