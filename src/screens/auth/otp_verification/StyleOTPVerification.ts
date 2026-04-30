import {StyleSheet, Text, View, Platform} from 'react-native';
import Theme from '../../../theme/Theme';
import {RF, RH} from '../../../components/store/ExternalLibrary';

const styles = StyleSheet.create({
  container: {},
  pinCodeContainer: {
    borderColor: Theme.COLORS.BLUE,
    borderWidth: RH(0.2),
    borderRadius: RH(1),
    height: RH(7),
    width: RH(7),
  },

  activePinCodeContainer: {
    borderColor: Theme.COLORS.BLUE,
  },
  filledPinCodeContainer: {
    borderColor: Theme.COLORS.DARK_BLUE,
  },
  center: {
    alignItems: 'center',
  },
  pinCodeText: {
    fontFamily: Theme.FONT_FAMILY.BOLD,
    fontSize: RH(2.6),
    color: Theme.COLORS.BLACK,
  },
  btn_position: {
    marginTop: Platform.OS === 'ios' ? RH(35) : RH(42),
  },
});

export default styles;
