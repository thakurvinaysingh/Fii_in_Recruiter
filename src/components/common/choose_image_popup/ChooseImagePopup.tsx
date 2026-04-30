import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {chooseCamera, chooseGallery, closePopup} from '../../store/ImageStore';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {ChooseImageButton} from '../../store/ComponentStore';
import {ChooseimgTypeIF} from '../../../types/ChooseImageTypes';
import styles from './StyleChooseImagePopup';

const ChooseImagePopup = ({
  _HANLDE_CLOSE,
  _HANDLE_CAMERA,
  _HANDLE_GALLERY,
  _HANDLE_OPEN,
  _TITLE,
}: ChooseimgTypeIF) => {
  return (
    <TouchableOpacity
      style={styles.pop_bg}
      activeOpacity={1}
      onPress={_HANLDE_CLOSE}>
      <TouchableOpacity
        style={styles.pop_box}
        activeOpacity={1}
        onPress={_HANDLE_OPEN}>
        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={30}
          onPress={_HANLDE_CLOSE}
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
        <View style={GLOBALSTYLE.mg_top_xs}>
          <ChooseImageButton
            _HANDLEPRESS={_HANDLE_CAMERA}
            _TEXT="Camera"
            _BTN_STYLE={styles.btn_transparent}
            _TEXT_STYLE={{}}
            _IMG={chooseCamera}
          />
        </View>
        <View style={GLOBALSTYLE.mg_top_xs}>
          <ChooseImageButton
            _HANDLEPRESS={_HANDLE_GALLERY}
            _TEXT="Gallery"
            _BTN_STYLE={styles.btn_transparent}
            _TEXT_STYLE={{}}
            _IMG={chooseGallery}
          />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ChooseImagePopup;
