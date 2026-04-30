import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {Button, Input, Timer, ToastPopup} from '../../store/ComponentStore';
import Theme from '../../../theme/Theme';
import styles from './StyleChangePhonePopup';
import {closePopup} from '../../store/ImageStore';
import {sendingPhoneOTP, verfiyingPhoneOTP} from '../../../api/ApiServices';
import {RootState} from '../../../redux/store/Store';
import {
  useSelector,
  useDispatch,
  RNLocalize,
  getCountryCallingCode,
} from '../../store/ExternalLibrary';
import {
  setIsChangePhoneOpen,
  setIsOTPVerifiedSucess,
  setIsTimeRunning,
  setNewChangedPhone,
  setTimeLeft,
} from '../../../redux/slices/CommonSlice';
import {setPhone, setPhoneErr} from '../../../redux/slices/ProfileSlice';

const ChangePhonePopup = () => {
  const dispatch = useDispatch();
  const [phoneInput, setPhoneInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [isSpinner, setIsSpinner] = useState(false);
  const [err, setErr] = useState({emailErr: '', phoneErr: '', otpErr: ''});
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPSentForToast, setIsOTPSentForToast] = useState(false);
  const timeLeft = useSelector(
    (state: RootState) => state.commonSlice.timeLeft,
  );

  const handleClosePopup = () => {
    dispatch(setIsChangePhoneOpen(false));
  };

  const handleSwitchToSendPhone = () => {
    setIsOTPSent(false);
    setPhoneInput('');
    setOtpInput('');
  };

  //   GETTING CALLING CODE +91
  const getCoountryCode = () => {
    const countryCode: any = RNLocalize.getCountry();
    const callingCode = getCountryCallingCode(countryCode);
    return '+' + callingCode;
  };

  setTimeout(() => {
    setIsOTPSentForToast(false);
  }, 3000);

  const code = getCoountryCode();
  // ONCHAGE EMAIL AND VALIDATION
  const onChangePhone = (val: string) => {
    if (val === ' ') {
      setPhoneInput('');
    } else {
      setErr(prevState => ({
        ...prevState,
        phoneErr: '',
      }));
    }
    setPhoneInput(val);
  };

  // HANDLE OTP INPUT
  const onChangeOTP = (val: string) => {
    setOtpInput(val);
    if (val) {
      setErr(prevState => ({
        ...prevState,
        otpErr: '',
      }));
    }
  };
  // SENDING OTP
  const sendPhoneOTP = async (type: string, phone: string) => {
    setIsSpinner(true);
    try {
      const response = await sendingPhoneOTP(type, phone);
      if (response.success) {
        console.log('response of send otp:', response.data);
        setIsSpinner(false);
        setIsOTPSent(true);
        setIsOTPSentForToast(true);
        setErr(prevState => ({
          ...prevState,
          otpErr: '',
        }));
        dispatch(setTimeLeft(30));
        dispatch(setIsTimeRunning(true));
      } else if (response.err === 'The email has already been taken.') {
        setErr(prevState => ({
          ...prevState,
          emailErr: 'This email is already in use',
        }));
        setIsSpinner(false);
      } else if (response.err === 'The phone has already been taken.') {
        setErr(prevState => ({
          ...prevState,
          phoneErr: 'This phone is already in use',
        }));
        setIsSpinner(false);
      } else {
        console.warn('Error in send otp:', response.err);
        setIsSpinner(false);
      }
    } catch (err: any) {
      console.warn('Error in send OTP catch:', err);
      setIsSpinner(false);
    }
  };

  // VERIFYING OTP
  const verifyOTP = async () => {
    if (!otpInput) {
      setErr(prevState => ({
        ...prevState,
        otpErr: 'Please enter OTP',
      }));
    } else {
      try {
        setIsSpinner(true);
        const response = await verfiyingPhoneOTP(phoneInput, Number(otpInput));
        if (response.success) {
          dispatch(setIsOTPVerifiedSucess(true));
          console.log('response of verify otp:', response.data);
          dispatch(setPhoneErr(''));
          setIsSpinner(false);
          dispatch(setNewChangedPhone(phoneInput));
          dispatch(setPhone(phoneInput));
          setErr(prevState => ({
            ...prevState,
            otpErr: '',
          }));

          dispatch(setIsChangePhoneOpen(false));
        } else if (response.err == 'Invalid OTP.') {
          setErr(prevState => ({
            ...prevState,
            otpErr: 'OTP is invalid',
          }));
          console.log('response.err:', response.err);
          setIsSpinner(false);
        } else {
          console.warn('Error in verify otp:', response.err);
          setIsSpinner(false);
        }
      } catch (err: any) {
        console.warn('Error in verify OTP catch:', err);
        setIsSpinner(false);
      }
    }
  };

  const handleSendOTP = () => {
    if (!phoneInput) {
      setErr(prevState => ({
        ...prevState,
        phoneErr: 'Please enter phone',
      }));
    } else if (err.emailErr === '') {
      sendPhoneOTP('phone', code + phoneInput);
      console.log('in api');
    }
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.pop_bg}>
          <View style={styles.pop_box}>
            <Text
              style={[
                GLOBALSTYLE.authTitle_medium_2,
                GLOBALSTYLE.text_center,
                GLOBALSTYLE.mg_bottom_xs,
              ]}>
              {isOTPSent ? 'Verify OTP' : 'Change Phone'}
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleClosePopup}
              style={styles.close_img_con}>
              <Image source={closePopup} style={styles.close_img} />
            </TouchableOpacity>

            {isOTPSent && (
              <Text
                style={[
                  GLOBALSTYLE.text_center,
                  GLOBALSTYLE.small_text,
                  styles.vertical_space,
                ]}>
                OTP sent to&nbsp;
                <Text style={GLOBALSTYLE.small_text_active}>{phoneInput}</Text>
              </Text>
            )}
            {isOTPSent ? (
              <>
                <Timer _BIG_TITLE={false} />
                {/* OTP INPUT */}
                <Input
                  _WIDTH={'100%'}
                  _ONCHANGE={onChangeOTP}
                  _PLACEHOLDER="OTP"
                  _VALUE={otpInput}
                  _KEYBOARDTYPE="number-pad"
                  _MAX_LENGTH={4}
                  _CENTER={true}
                  _LABEL={
                    <>{/* <Text style={GLOBALSTYLE.required}>*</Text> */}</>
                  }
                />

                <View style={[GLOBALSTYLE.flex, GLOBALSTYLE.mg_top_xxs]}>
                  <Text style={GLOBALSTYLE.error_text}>{err.otpErr}</Text>
                  {timeLeft === 0 && (
                    <Text
                      style={GLOBALSTYLE.small_text_active}
                      onPress={() => sendPhoneOTP('phone', code + phoneInput)}>
                      Resend OTP
                    </Text>
                  )}
                </View>
              </>
            ) : (
              <>
                {/* EMAIL INPUT */}
                <Input
                  _WIDTH={'100%'}
                  _ONCHANGE={onChangePhone}
                  _PLACEHOLDER="Enter phone"
                  _VALUE={phoneInput}
                  _MAX_LENGTH={10}
                  _KEYBOARDTYPE="number-pad"
                  _LABEL={
                    <>
                      New Phone <Text style={GLOBALSTYLE.required}>*</Text>
                    </>
                  }
                />
                <Text style={GLOBALSTYLE.error_text}>{err.phoneErr}</Text>
              </>
            )}
            <View style={GLOBALSTYLE.mg_top_xs}>
              <Button
                _TEXT={
                  isSpinner ? (
                    <ActivityIndicator
                      color={Theme.COLORS.DARK_BLUE}
                      size={'small'}
                    />
                  ) : isOTPSent ? (
                    'Verify OTP'
                  ) : (
                    'Send OTP'
                  )
                }
                _ONPRESS={isOTPSent ? verifyOTP : handleSendOTP}
                _BTNSTYLE={styles.btn_container}
                _TEXT_STYLE={styles.button}
              />
            </View>
            {isOTPSent && (
              <Text
                onPress={handleSwitchToSendPhone}
                style={[
                  GLOBALSTYLE.small_text_active,
                  GLOBALSTYLE.text_center,
                  GLOBALSTYLE.mg_top_xxs,
                ]}>
                Want to use another phone?
              </Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      {isOTPSentForToast && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="OTP sent successfully"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
    </>
  );
};

export default ChangePhonePopup;
