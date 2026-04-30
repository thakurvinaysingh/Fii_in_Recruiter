import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ButtonIF} from '../../../types/ButtonTypes';
import {LinearGradient} from '../../store/ExternalLibrary';
import styles from './StyleButton';
const Button = ({_ONPRESS, _TEXT, _BTNSTYLE, _TEXT_STYLE}: ButtonIF) => {
  return (
    <LinearGradient
      colors={['#0052DB', '#81efe3']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradient}>
      <TouchableOpacity
        onPress={_ONPRESS}
        style={_BTNSTYLE}
        activeOpacity={0.7}>
        <Text style={_TEXT_STYLE}>{_TEXT}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Button;
