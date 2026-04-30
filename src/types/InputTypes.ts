import React, {HtmlHTMLAttributes} from 'react';
import {TextStyle} from 'react-native';
import {ImageProps, KeyboardTypeOptions, TextInput} from 'react-native';

export interface InputIF {
  _ONKEY_PRESS?: () => void;
  _VALUE: string;
  _ONCHANGE: (val: string) => void;
  _PLACEHOLDER: string;
  _IMG?: ImageProps;
  _LABEL?: string | React.ReactNode;
  _SECURE?: boolean;
  _HANDLE_SECURE?: () => void;
  _KEYBOARDTYPE?: KeyboardTypeOptions;
  _REF?: React.RefObject<TextInput>;
  _WIDTH?: number | `${number}%` | 'auto';
  _ISBORDER?: boolean;
  _MAX_LENGTH?: number;
  _EDITABLE?: boolean;
  _CENTER?: boolean;
}
