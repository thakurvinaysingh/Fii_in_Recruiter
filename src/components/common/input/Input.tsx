import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {InputIF} from '../../../types/InputTypes';
import styles from './StyleInput';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
const Input = ({
  _VALUE,
  _ONCHANGE,
  _PLACEHOLDER,
  _IMG,
  _LABEL,
  _SECURE,
  _HANDLE_SECURE,
  _KEYBOARDTYPE,
  _ONKEY_PRESS,
  _REF,
  _WIDTH,
  _ISBORDER,
  _MAX_LENGTH,
  _EDITABLE,
  _CENTER,
}: InputIF) => {
  return (
    <View>
      {_LABEL && (
        <Text style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
          {_LABEL}
        </Text>
      )}
      <View style={styles.parant}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            ref={_REF}
            value={_VALUE}
            onChangeText={_ONCHANGE}
            placeholder={_PLACEHOLDER}
            maxLength={_MAX_LENGTH}
            editable={_EDITABLE}
            style={[
              [
                _ISBORDER
                  ? styles.input_style
                  : _CENTER
                  ? styles.input_style_without_border_center
                  : styles.input_style_without_border,
              ],
              {width: _WIDTH},
            ]}
            placeholderTextColor={'grey'}
            secureTextEntry={_SECURE}
            keyboardType={_KEYBOARDTYPE}
            onKeyPress={_ONKEY_PRESS}
          />
        </View>
        {_IMG && (
          <TouchableOpacity
            hitSlop={30}
            activeOpacity={0.8}
            onPress={_HANDLE_SECURE}>
            <Image source={_IMG} style={styles.eye} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
