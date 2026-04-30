import {StyleSheet, Text, View} from 'react-native';
import {RH} from '../../../components/store/ExternalLibrary';

const styles = StyleSheet.create({
  check_img: {
    aspectRatio: 1,
    resizeMode: 'contain',
    width: RH(3),
    marginRight: RH(2),
  },
  width: {
    width: '85%',
  },
  mg_bottom: {
    marginBottom: RH(4),
  },
  webview: {
    height: 200, // Fixed height or calculate based on content
    width: '100%',
    marginBottom: 10,
  },
});

export default styles;
