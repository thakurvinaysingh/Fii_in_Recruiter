import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {Button, Input, Timer, ToastPopup} from '../../store/ComponentStore';
import Theme from '../../../theme/Theme';
import styles from './StyleChangeEmailPhonePopup';
import {closePopup} from '../../store/ImageStore';
import {REGEX_EMAIL} from '../../../constants/Data';
import {changingEmailOTP, sendingOTP} from '../../../api/ApiServices';
import {RootState} from '../../../redux/store/Store';
import {useSelector, useDispatch} from '../../store/ExternalLibrary';
import {
  setIsChangeEmailOpen,
  setIsOTPVerifiedSucessEmail,
  setIsTimeRunning,
  setNewChangedEmail,
  setTimeLeft,
} from '../../../redux/slices/CommonSlice';

const ChangeEmailPopup = () => {
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [isSpinner, setIsSpinner] = useState(false);
  const [err, setErr] = useState({emailErr: '', phoneErr: '', otpErr: ''});
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPSentForToast, setIsOTPSentForToast] = useState(false);
  const timeLeft = useSelector(
    (state: RootState) => state.commonSlice.timeLeft,
  );
  const handleClosePopup = () => {
    dispatch(setIsChangeEmailOpen(false));
  };

  setTimeout(() => {
    setIsOTPSentForToast(false);
  }, 3000);

  const handleSwitchToSendEmail = () => {
    setIsOTPSent(false);
    setEmailInput('');
    setOtpInput('');
  };
  // ONCHAGE EMAIL AND VALIDATION
  const onChangeEmail = (val: string) => {
    if (val === ' ') {
      setEmailInput('');
    } else if (val.length > 0 && !REGEX_EMAIL.test(val)) {
      setErr(prevState => ({
        ...prevState,
        emailErr: 'Email is not valid',
      }));
    } else {
      setErr(prevState => ({
        ...prevState,
        emailErr: '',
      }));
    }
    setEmailInput(val);
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
  const sendOTP = async () => {
    setIsSpinner(true);
    try {
      const response = await sendingOTP(emailInput);
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
        const response = await changingEmailOTP(emailInput, Number(otpInput));
        if (response.success) {
          dispatch(setIsOTPVerifiedSucessEmail(true));
          console.log('response of verify otp:', response.data);
          setIsSpinner(false);
          dispatch(setNewChangedEmail(emailInput));
          setErr(prevState => ({
            ...prevState,
            otpErr: '',
          }));

          dispatch(setIsChangeEmailOpen(false));
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
    if (!emailInput) {
      setErr(prevState => ({
        ...prevState,
        emailErr: 'Please enter email',
      }));
    } else if (err.emailErr === '') {
      sendOTP();
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
              {isOTPSent ? 'Verify OTP' : 'Change Email'}
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
                <Text style={GLOBALSTYLE.small_text_active}>{emailInput}</Text>
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
                      onPress={sendOTP}>
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
                  _ONCHANGE={onChangeEmail}
                  _PLACEHOLDER="example@gmail.com"
                  _VALUE={emailInput}
                  _LABEL={
                    <>
                      New Email <Text style={GLOBALSTYLE.required}>*</Text>
                    </>
                  }
                />
                <Text style={GLOBALSTYLE.error_text}>{err.emailErr}</Text>
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
                onPress={handleSwitchToSendEmail}
                style={[
                  GLOBALSTYLE.small_text_active,
                  GLOBALSTYLE.text_center,
                  GLOBALSTYLE.mg_top_xxs,
                ]}>
                Want to use another email?
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

export default ChangeEmailPopup;
