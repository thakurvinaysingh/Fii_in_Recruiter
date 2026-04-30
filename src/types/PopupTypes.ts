import {ImageProps} from 'react-native';

export interface PopupIF {
  _TITLE: string;
  _DESCRIPTION: string;
  _BTN_TEXT: string;
  _ONPRESS: () => void;
  _IMG: ImageProps;
}
