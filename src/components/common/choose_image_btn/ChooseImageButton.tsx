import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from '../button/StyleButton';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {TransparentButtonIF} from '../../../types/ButtonTypes';
const ChooseImageButton = ({
  _IMG,
  _TEXT,
  _HANDLEPRESS,
  _BTN_STYLE,
  _TEXT_STYLE,
}: TransparentButtonIF) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.transparent_button, _BTN_STYLE]}
      onPress={_HANDLEPRESS}>
      <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
        {_IMG && <Image source={_IMG} style={styles.camera_img} />}
        <Text style={[styles.transparent_btn_text, _TEXT_STYLE]}>{_TEXT}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChooseImageButton;
