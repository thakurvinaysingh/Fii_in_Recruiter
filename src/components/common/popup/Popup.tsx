import {Image, Text, View} from 'react-native';
import React from 'react';
import styles from './StylePopup';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {Button} from '../../store/ComponentStore';
import {PopupIF} from '../../../types/PopupTypes';

const Popup = ({_TITLE, _DESCRIPTION, _BTN_TEXT, _ONPRESS, _IMG}: PopupIF) => {
  return (
    <View style={styles.pop_bg}>
      <View style={styles.pop_box}>
        <Image source={_IMG} style={styles.success_img} />
        <Text style={[GLOBALSTYLE.authTitle, GLOBALSTYLE.mg_top_xs]}>
          {_TITLE}
        </Text>
        <Text
          style={[
            GLOBALSTYLE.subTitle,
            GLOBALSTYLE.mg_top_xs,
            GLOBALSTYLE.text_center,
          ]}>
          {_DESCRIPTION}
        </Text>

        <View style={GLOBALSTYLE.mg_top_s}>
          <Button
            _TEXT={_BTN_TEXT}
            _ONPRESS={_ONPRESS}
            _BTNSTYLE={GLOBALSTYLE.btn_container}
            _TEXT_STYLE={GLOBALSTYLE.button}
          />
        </View>
      </View>
    </View>
  );
};

export default Popup;
