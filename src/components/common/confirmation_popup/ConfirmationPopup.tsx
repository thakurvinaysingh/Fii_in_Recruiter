import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './StyleConfirmationPopup';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {Button, TransparentButton} from '../../store/ComponentStore';
import {closePopup, closeSmall, logoutImg} from '../../store/ImageStore';
import {ConfirmationPopupIF} from '../../../types/ConfirmationPopup';
const ConfirmationPopup = ({
  _TITLE,
  _SUBTITLE,
  _HANLDENO,
  _HANDLEYES,
  _HANDLENUTERAL,
}: ConfirmationPopupIF) => {
  const handleNoPress = () => {};
  return (
    <TouchableOpacity
      style={styles.pop_bg}
      activeOpacity={1}
      onPress={_HANLDENO}>
      <TouchableOpacity
        style={styles.pop_box}
        activeOpacity={1}
        onPress={_HANDLENUTERAL}>
        <Image source={logoutImg} style={styles.logout_img} />
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={30}
          onPress={_HANLDENO}
          style={styles.close_img_container}>
          <Image source={closePopup} style={styles.close_img} />
        </TouchableOpacity>
        <Text
          style={[
            GLOBALSTYLE.authTitle_medium,
            GLOBALSTYLE.text_center,
            GLOBALSTYLE.mg_bottom_xs,
          ]}>
          {_TITLE}
        </Text>
        <Text style={[GLOBALSTYLE.subTitle, GLOBALSTYLE.text_center]}>
          {_SUBTITLE}
        </Text>

        <View style={GLOBALSTYLE.mg_top_s}>
          <Button
            _TEXT="No"
            _ONPRESS={_HANLDENO}
            _BTNSTYLE={GLOBALSTYLE.btn_container}
            _TEXT_STYLE={GLOBALSTYLE.button}
          />
        </View>
        <View style={GLOBALSTYLE.mg_top_xs}>
          <TransparentButton
            _HANDLEPRESS={_HANDLEYES}
            _TEXT="Yes"
            _BTN_STYLE={styles.btn_transparent}
            _TEXT_STYLE={styles.btn_text}
          />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ConfirmationPopup;
