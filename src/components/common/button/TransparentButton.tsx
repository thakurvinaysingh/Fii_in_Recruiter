import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './StyleButton';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {TransparentButtonIF} from '../../../types/ButtonTypes';
const TransparentButton = ({
  _IMG,
  _TEXT,
  _HANDLEPRESS,
  _BTN_STYLE,
  _TEXT_STYLE,
}: TransparentButtonIF) => {
  return (
    <TouchableOpacity
      style={[styles.transparent_button, _BTN_STYLE]}
      activeOpacity={0.7}
      onPress={_HANDLEPRESS}>
      <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
        {_IMG && <Image source={_IMG} style={styles.call_img} />}
        <Text style={[styles.transparent_btn_text, _TEXT_STYLE]}>{_TEXT}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransparentButton;
