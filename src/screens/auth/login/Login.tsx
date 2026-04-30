import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  apple,
  authLogo,
  eyeClose,
  eyeOpen,
  facebook,
  google,
} from '../../../components/store/ImageStore';
import {
  Button,
  Input,
  ToastPopup,
} from '../../../components/store/ComponentStore';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  NativeStackNavigationProp,
  useNavigation,
  useDispatch,
  AsyncStorage,
  useSelector,
  useFocusEffect,
  DeviceInfo,
} from '../../../components/store/ExternalLibrary';
import {AuthStackParamList} from '../../../types/AuthStack';
import {
  setAuthToken,
  setIsLoginSuccess,
  setIsLogoutSuccess,
  setIsOTPVerified,
  setIsPassChangedSuccess,
} from '../../../redux/slices/CommonSlice';
import {login} from '../../../api/ApiServices';
import {REGEX_EMAIL} from '../../../constants/Data';
import {RootState} from '../../../redux/store/Store';
import styles from './StyleLogin';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const Login = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [err, setErr] = useState({email: '', password: ''});
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [isInProgress, setIsInProgress] = useState(false);
  const [isSuccessResponse, setIsSuccessResponse] = useState(false);
  const {fcmToken, isPassChangedSuccess, isOTPVerified} = useSelector(
    (state: RootState) => state.commonSlice,
  );
  useEffect(() => {
    DeviceInfo.getUniqueId().then(id => {
      setDeviceId(id);
    });
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  // GOOGLE SIGNIN CONFIGURE
  GoogleSignin.configure({
    webClientId: process.env.WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
    iosClientId: process.env.IOS_CLIENT_ID,
  });

  useFocusEffect(
    useCallback(() => {
      setEmailInput('');
      setPassInput('');
    }, []),
  );
  const onChangeEmail = (val: string) => {
    if (val === ' ') {
      setEmailInput('');
    } else if (val.length > 0 && !REGEX_EMAIL.test(val)) {
      setErr(prevState => ({
        ...prevState,
        email: 'Email is not valid',
        pass: '',
      }));
    } else if (val.length > 0) {
      setErr(prevState => ({
        ...prevState,
        email: '',
        password: '',
      }));
    } else {
      setErr(prevState => ({
        ...prevState,
        email: '',
      }));
    }
    setEmailInput(val);
  };

  const onChangePass = (val: string) => {
    if (val.length > 0) {
      setErr(prevState => ({
        ...prevState,
        password: '',
      }));
    }
    setPassInput(val);
  };

  const handleSecure = () => {
    setIsSecure(!isSecure);
  };

  const handleSignInPress = () => {
    if (validateLoginForm() && err.email == '' && err.password == '') {
      loginUser();
    }
  };

  const handleSignUp = () => {
    navigation.navigate('REGISTER');
  };

  const handleForgotPass = () => {
    navigation.navigate('FORGOT_PASS');
  };

  useEffect(() => {
    const gettingIntroStep = async () => {
      try {
        const introCompleted = await AsyncStorage.getItem('introStep');
        console.log('introCompleted:', introCompleted);
      } catch (err) {
        console.log('Error while getting the intro step');
      }
    };
    gettingIntroStep();
  }, []);

  // LOGIN PARAMS
  const loginParams = {
    email: emailInput,
    password: passInput,
    fcm_token: fcmToken,
    device_id: deviceId,
  };
  console.log('loginParams:', loginParams);

  // LOGIN USER
  const loginUser = async () => {
    setIsLoading(true);
    try {
      const response = await login(loginParams);
      if (response.success) {
        console.log('Response in login api:', response);
        setIsLoading(false);
        dispatch(setAuthToken(response.data.token));
        await AsyncStorage.setItem('authToken', response.data.token);
        dispatch(setIsLoginSuccess(true));
        console.log('response.data.token:', response.data.token);
      } else if (response.err === 'The selected email is invalid.') {
        setErr(prevState => ({
          ...prevState,
          email: 'This Email is not registered',
        }));
        setIsLoading(false);
        console.log('res.err if:', response.err);
      } else if (response.err === 'Invalid credentials') {
        console.log('res.err else:', response.err);
        setErr(prevState => ({
          ...prevState,
          password: 'Password is incorrect',
        }));
        setIsLoading(false);
      } else if (
        response.err === 'Account not verified. Please verify your email.'
      ) {
        setIsLoading(false);
        navigation.navigate('OTP_VERIFICATION', {
          emailInput,
          fromForgot: false,
        });
      } else {
        console.error('Error in login:', response.err);
      }
    } catch (err: any) {
      console.warn('Error in login in catch:', err);
      setIsLoading(false);
    }
  };
  const validateLoginForm = () => {
    if (!emailInput && err.password == '') {
      setErr(prevState => ({
        ...prevState,
        email: 'Email is required*',
      }));
      return false;
    } else if (!passInput && err.email == '') {
      setErr(prevState => ({
        ...prevState,
        password: 'Password is required*',
      }));
      return false;
    } else {
      return true;
    }
  };

  // LOGOUT STATE FALSE
  setTimeout(() => {
    dispatch(setIsLogoutSuccess(false));
    dispatch(setIsOTPVerified(false));
    dispatch(setIsPassChangedSuccess(false));
  });

  // GOOGLE SIGNIN
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log('response:', response);
    } catch (error) {
      console.error('Error while google login:', error);
    }
  };
  return (
    <>
      <SafeAreaView style={GLOBALSTYLE.safeContainer}>
        <View style={GLOBALSTYLE.container}>
          <ScrollView
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <Image source={authLogo} style={GLOBALSTYLE.auth_logo} />
            <View style={GLOBALSTYLE.mg_top_xs}>
              <Text style={GLOBALSTYLE.authTitle}>Sign In</Text>
              <Text
                style={[
                  GLOBALSTYLE.subTitle,
                  GLOBALSTYLE.mg_top_xs,
                  GLOBALSTYLE.text_center,
                ]}>
                Hi Welcome Back, you've been missed
              </Text>
            </View>
            <View style={[GLOBALSTYLE.mg_top_m_main]}>
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
            </View>
            <Text style={GLOBALSTYLE.error_text}>{err.email}</Text>
            <Input
              _WIDTH={'100%'}
              _ONCHANGE={onChangePass}
              _PLACEHOLDER="Enter Password"
              _VALUE={passInput}
              _LABEL={
                <>
                  Password <Text style={GLOBALSTYLE.required}>*</Text>
                </>
              }
              _IMG={isSecure ? eyeOpen : eyeClose}
              _SECURE={isSecure}
              _HANDLE_SECURE={handleSecure}
            />
            <Text style={GLOBALSTYLE.error_text}>{err.password}</Text>
            <Text
              style={[
                GLOBALSTYLE.subTitleActive,
                GLOBALSTYLE.text_right,
                styles.forgot_text,
              ]}
              onPress={handleForgotPass}>
              Forgot Password?
            </Text>
            <View style={GLOBALSTYLE.mg_top_s}>
              <Button
                _TEXT="Sign In"
                _ONPRESS={handleSignInPress}
                _BTNSTYLE={GLOBALSTYLE.btn_container}
                _TEXT_STYLE={GLOBALSTYLE.button}
              />
            </View>
            {/* GOOGLE SIGNIN */}
            {/* <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signInWithGoogle}
              disabled={isInProgress}
            /> */}

            <View style={[GLOBALSTYLE.flex, GLOBALSTYLE.mg_top_s]}>
              <View style={GLOBALSTYLE.line}></View>
              <Text style={GLOBALSTYLE.subTitle}>OR</Text>
              <View style={GLOBALSTYLE.line}></View>
            </View>
            <View
              style={[
                Platform.OS == 'ios'
                  ? GLOBALSTYLE.flex
                  : GLOBALSTYLE.flex_even_space,

                GLOBALSTYLE.mg_top_s,
                GLOBALSTYLE.padding,
              ]}>
              {Platform.OS == 'ios' && (
                <TouchableOpacity>
                  <Image source={apple} style={GLOBALSTYLE.social_img} />
                </TouchableOpacity>
              )}
              <TouchableOpacity>
                <Image source={google} style={GLOBALSTYLE.social_img} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={facebook} style={GLOBALSTYLE.social_img} />
              </TouchableOpacity>
            </View>
            <Text
              style={[
                GLOBALSTYLE.subTitle,
                GLOBALSTYLE.mg_top_s,
                GLOBALSTYLE.text_center,
              ]}>
              Don't have an account?{' '}
              <Text style={GLOBALSTYLE.subTitleActive} onPress={handleSignUp}>
                Sign Up
              </Text>
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}

      {isPassChangedSuccess && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Password Changed Successfully!"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}

      {isOTPVerified && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="OTP Verified Successfully!"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
    </>
  );
};

export default Login;
