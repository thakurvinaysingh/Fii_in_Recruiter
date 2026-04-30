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
import React, {useCallback, useState} from 'react';

import {Button, Input} from '../../../components/store/ComponentStore';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  NativeStackNavigationProp,
  useNavigation,
  useDispatch,
  useFocusEffect,
} from '../../../components/store/ExternalLibrary';
import {AuthStackParamList} from '../../../types/AuthStack';
import {backMain, forgotBg} from '../../../components/store/ImageStore';
import {sendingOTP} from '../../../api/ApiServices';
import {REGEX_EMAIL} from '../../../constants/Data';
import {
  setIsForgotPassOTPSent,
  setIsTimeRunning,
  setTimeLeft,
} from '../../../redux/slices/CommonSlice';
const ForgotPass = () => {
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const onChangeEmail = (val: string) => {
    if (val.length > 0 && !REGEX_EMAIL.test(val)) {
      setError('Email is invalid');
    } else {
      setError('');
    }
    setEmailInput(val);
  };

  const dispatch = useDispatch();

  const handleContinuePress = () => {
    sendOTP();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      setEmailInput('');
    }, []),
  );

  // SENDING OTP
  const sendOTP = async () => {
    setIsLoading(true);
    if (emailInput) {
      try {
        const response = await sendingOTP(emailInput);
        if (response.success) {
          console.log('response of send otp:', response.data);
          setIsLoading(false);
          navigation.navigate('OTP_VERIFICATION', {
            emailInput,
            fromForgot: true,
          });
          dispatch(setIsForgotPassOTPSent(true));
          dispatch(setTimeLeft(30));
          dispatch(setIsTimeRunning(true));
        } else if (response.err === 'The selected email is invalid.') {
          setError('This email is not registered');
          console.warn('Error in send otp:', response.err);
          setIsLoading(false);
        }
      } catch (err: any) {
        console.warn('Error in send OTP catch:', err);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Email is required*');
      setIsLoading(false);
    }
  };
  return (
    <>
      <SafeAreaView style={GLOBALSTYLE.safeContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <View style={GLOBALSTYLE.container}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <TouchableOpacity onPress={handleBack}>
                <Image source={backMain} style={GLOBALSTYLE.back_btn} />
              </TouchableOpacity>
              <View style={GLOBALSTYLE.mg_top_s}>
                <Text style={GLOBALSTYLE.authTitle}>Forgot Password</Text>
                <Text
                  style={[
                    GLOBALSTYLE.subTitle,
                    GLOBALSTYLE.mg_top_xs,
                    GLOBALSTYLE.text_center,
                  ]}>
                  Please enter your email and we send an OTP code in the next
                  step to OTP Verification
                </Text>
              </View>
              <View>
                <Image source={forgotBg} style={GLOBALSTYLE.bg_img} />
              </View>
              <View style={GLOBALSTYLE.mg_top_s}>
                <Input
                  _WIDTH={'100%'}
                  _ONCHANGE={onChangeEmail}
                  _PLACEHOLDER="Enter Email"
                  _VALUE={emailInput}
                  _LABEL={
                    <>
                      Email Address <Text style={GLOBALSTYLE.required}>*</Text>
                    </>
                  }
                />
                <Text style={GLOBALSTYLE.error_text}>{error}</Text>
              </View>
              <View style={GLOBALSTYLE.mg_top_s}>
                <Button
                  _TEXT="Continue"
                  _ONPRESS={handleContinuePress}
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
    </>
  );
};

export default ForgotPass;
