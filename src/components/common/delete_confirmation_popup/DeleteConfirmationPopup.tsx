import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './StyleDeleteConfirmationPopup';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {Button, TransparentButton} from '../../store/ComponentStore';
import {DeletePopupIF} from '../../../types/DeletePopupIF';

const DeleteConfirmationPopup = ({
  _TITLE,
  _DESCRIPTION,
  _HANDLE_NO,
  _HANDLE_YES,
  _HANDLE_NUTERAL,
}: DeletePopupIF) => {
  return (
    <TouchableOpacity
      style={styles.pop_bg}
      onPress={_HANDLE_NO}
      activeOpacity={1}>
      <TouchableOpacity
        style={styles.pop_box}
        onPress={_HANDLE_NUTERAL}
        activeOpacity={1}>
        <Text
          style={[
            GLOBALSTYLE.authTitle_medium,
            GLOBALSTYLE.text_center,
            GLOBALSTYLE.mg_bottom_xs,
          ]}>
          {_TITLE}
        </Text>
        <Text style={[GLOBALSTYLE.subTitle, GLOBALSTYLE.text_center]}>
          {_DESCRIPTION}
        </Text>

        <View style={GLOBALSTYLE.mg_top_s}>
          <Button
            _TEXT="No"
            _ONPRESS={_HANDLE_NO}
            _BTNSTYLE={GLOBALSTYLE.btn_container}
            _TEXT_STYLE={GLOBALSTYLE.button}
          />
        </View>
        <View style={GLOBALSTYLE.mg_top_xs}>
          <TransparentButton
            _HANDLEPRESS={_HANDLE_YES}
            _TEXT="Yes"
            _BTN_STYLE={styles.btn_transparent}
            _TEXT_STYLE={styles.btn_text}
          />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DeleteConfirmationPopup;
