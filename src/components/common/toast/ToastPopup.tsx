import {Platform} from 'react-native';
import React, {useEffect} from 'react';
import {RH, Toast} from '../../store/ExternalLibrary';
import {ToastIF} from '../../../types/ToastTypes';

const ToastPopup = ({
  _TYPE,
  _TEXT1,
  _TEXT2,
  _TIME,
  _TEXT1_STYLE,
  _TEXT2_STYLE,
}: ToastIF) => {
  const showToast = () => {
    Toast.show({
      type: _TYPE,
      text1: _TEXT1,
      text2: _TEXT2,
      text1Style: _TEXT1_STYLE,
      text2Style: _TEXT2_STYLE,
      visibilityTime: _TIME,
      topOffset: Platform.OS == 'android' ? RH(1) : RH(5),
    });
  };

  useEffect(() => {
    showToast();
  }, []);
  return <></>;
};

export default ToastPopup;
