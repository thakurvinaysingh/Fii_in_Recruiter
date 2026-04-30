import React from 'react';
import {ImageProps, StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface ButtonIF {
  _ONPRESS: () => void;
  _TEXT: string | React.ReactNode;
  _BTNSTYLE?: StyleProp<ViewStyle>;
  _TEXT_STYLE?: StyleProp<TextStyle>;
}

export interface TransparentButtonIF {
  _IMG?: ImageProps;
  _TEXT: string | React.ReactNode;
  _HANDLEPRESS: () => void;
  _BTN_STYLE?: StyleProp<ViewStyle>;
  _TEXT_STYLE?: StyleProp<TextStyle>;
}
