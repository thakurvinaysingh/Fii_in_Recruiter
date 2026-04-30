import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  Button,
  Timer,
  ToastPopup,
} from '../../../components/store/ComponentStore';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  NativeStackNavigationProp,
  useNavigation,
  OtpInput,
  RouteProp,
  useSelector,
  useDispatch,
} from '../../../components/store/ExternalLibrary';
import {AuthStackParamList} from '../../../types/AuthStack';
import {backMain} from '../../../components/store/ImageStore';
import styles from './StyleOTPVerification';
import Theme from '../../../theme/Theme';
import {sendingOTP, verifyingOTP} from '../../../api/ApiServices';
import {RootState} from '../../../redux/store/Store';
import {
  setIsForgotPassOTPSent,
  setIsOTPSentSuccess,
  setIsOTPVerified,
  setIsTimeRunning,
  setTimeLeft,
  setIsOTPInvalid,
} from '../../../redux/slices/CommonSlice';

type OTPVerificationType = RouteProp<AuthStackParamList, 'OTP_VERIFICATION'>;
const OTPVerification = ({route}: {route: OTPVerificationType}) => {
  const [OTP, setOTP] = useState('');
  const [OTPError, setOTPError] = useState('');
  const email = route.params.emailInput;
  const fromForgot = route.params.fromForgot;
  const [isLoading, setIsLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {isOTPSentSuccess, timeLeft, isForgotPassOTPSent, isOTPInvalid} =
    useSelector((state: RootState) => state.commonSlice);

  const dispatch = useDispatch();
  const handleVerifyPress = () => {
    verifyOTP();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setOTP('');
  }, []);

  // SENDING OTP
  const sendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await sendingOTP(email);
      if (response.success) {
        console.log('response of send otp:', response.data);
        setIsLoading(false);
        dispatch(setIsOTPSentSuccess(true));
        dispatch(setTimeLeft(30));
        dispatch(setIsTimeRunning(true));
      } else {
        console.warn('Error in send otp:', response.err);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.warn('Error in send OTP catch:', err);
      setIsLoading(false);
    } finally {
      console.log('Stopping loader...');
      setIsLoading(false);
    }
  };

  // DON'T SEND OTP WHEN USER COME FOR FORGOT PASSWORD
  useEffect(() => {
    if (!fromForgot) {
      sendOTP();
    }
  }, []);

  useEffect(() => {
    dispatch(setIsOTPInvalid(false));
  }, []);

  // VERIFYING OTP
  const verifyOTP = async () => {
    if (!OTP) {
      setOTPError('Please enter OTP');
    } else {
      try {
        setIsLoading(true);
        const response = await verifyingOTP(email, OTP);
        if (response.success) {
          console.log('response of verify otp:', response.data);
          setIsLoading(false);
          setOTPError('');
          if (fromForgot) {
            navigation.navigate('CHANGE_PASS', {emailInput: email});
          } else {
            navigation.navigate('LOGIN');
          }
          dispatch(setIsOTPVerified(true));
        } else if (response.err == 'Invalid OTP.') {
          console.log('response.err:', response.err);
          setIsLoading(false);
          dispatch(setIsOTPInvalid(true));
          setTimeout(() => {
            dispatch(setIsOTPInvalid(false));
          }, 50);
        } else {
          console.warn('Error in verify otp:', response.err);
          setIsLoading(false);
        }
      } catch (err: any) {
        console.warn('Error in verify OTP catch:', err);
        setIsLoading(false);
      }
    }
  };

  // LOGOUT STATE FALSE
  setTimeout(() => {
    dispatch(setIsOTPSentSuccess(false));
    dispatch(setIsForgotPassOTPSent(false));
  });

  const nothing = () => {};
  return (
    <>
      <SafeAreaView style={GLOBALSTYLE.safeContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <View style={GLOBALSTYLE.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity onPress={handleBack}>
                <Image source={backMain} style={GLOBALSTYLE.back_btn} />
              </TouchableOpacity>
              <View style={GLOBALSTYLE.mg_top_s}>
                <Text style={GLOBALSTYLE.authTitle}>OTP Verification</Text>
                <Text
                  style={[
                    GLOBALSTYLE.subTitle,
                    GLOBALSTYLE.mg_top_xs,
                    GLOBALSTYLE.text_center,
                  ]}>
                  We have an OTP code to your email&nbsp;
                  <Text style={GLOBALSTYLE.subTitleActive}>{email}</Text> Enter
                  the OTP code below to verify
                </Text>
              </View>

              <View style={[GLOBALSTYLE.mg_top_s, styles.center]}>
                <Timer />
              </View>
              <View style={GLOBALSTYLE.mg_top_s}>
                <OtpInput
                  numberOfDigits={4}
                  type="numeric"
                  onTextChange={text => setOTP(text)}
                  onFilled={text => console.log(`OTP is ${text}`)}
                  focusColor={Theme.COLORS.BLACK}
                  autoFocus={false}
                  theme={{
                    containerStyle: styles.container,
                    pinCodeContainerStyle: styles.pinCodeContainer,
                    focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                    filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                    pinCodeTextStyle: styles.pinCodeText,
                  }}
                />
                {OTPError && (
                  <Text style={GLOBALSTYLE.error_text}>{OTPError}</Text>
                )}
              </View>
              <View style={GLOBALSTYLE.mg_top_s}>
                <Text style={[GLOBALSTYLE.subTitle, GLOBALSTYLE.text_center]}>
                  Don't recieved the OTP?{' '}
                  <Text
                    style={
                      timeLeft !== 0
                        ? GLOBALSTYLE.subTitle
                        : GLOBALSTYLE.subTitleActive
                    }
                    onPress={timeLeft === 0 ? sendOTP : nothing}>
                    Resend
                  </Text>
                </Text>
              </View>
              <View style={[styles.btn_position]}>
                <Button
                  _TEXT="Verify"
                  _ONPRESS={handleVerifyPress}
                  _BTNSTYLE={GLOBALSTYLE.btn_container}
                  _TEXT_STYLE={GLOBALSTYLE.button}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}

      {isOTPSentSuccess && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="OTP Sent Successfully"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
      {isForgotPassOTPSent && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="OTP Sent Successfully"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}

      {isOTPInvalid && (
        <ToastPopup
          _TYPE="error"
          _TEXT1="Failed"
          _TEXT2="OTP is invalid"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style_error}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
    </>
  );
};

export default OTPVerification;
