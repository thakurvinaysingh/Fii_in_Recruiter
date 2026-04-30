import {StyleSheet, Text, View} from 'react-native';
import Theme from '../../../theme/Theme';
import {RH} from '../../store/ExternalLibrary';

const styles = StyleSheet.create({
  box: {
    backgroundColor: Theme.COLORS.WHITE,
    margin: RH(0.7),
    padding: RH(1),
    borderRadius: RH(1),
    width: '47%',
  },
  img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(4.5),
  },
  sub_title: {
    textAlign: 'left',
  },
  text_container: {
    flex: 1,
    // flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
});

export default styles;
