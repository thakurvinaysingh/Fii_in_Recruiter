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
import React, {useState} from 'react';
import {
  Button,
  Input,
  Popup,
  ToastPopup,
} from '../../../components/store/ComponentStore';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  NativeStackNavigationProp,
  RouteProp,
  useNavigation,
  useDispatch,
  useSelector,
} from '../../../components/store/ExternalLibrary';
import {AuthStackParamList} from '../../../types/AuthStack';
import {
  backMain,
  eyeClose,
  eyeOpen,
  forgotBg,
  success,
} from '../../../components/store/ImageStore';
import {changePass} from '../../../api/ApiServices';
import {setIsOTPVerified} from '../../../redux/slices/CommonSlice';
import {RootState} from '../../../redux/store/Store';

type OTPVerificationType = RouteProp<AuthStackParamList, 'CHANGE_PASS'>;
const ChangePass = ({route}: {route: OTPVerificationType}) => {
  const [passInput, setPassInput] = useState('');
  const [cPassInput, setCPassInput] = useState('');
  const [isPassSecure, setIsPassSecure] = useState(true);
  const [isCPassSecure, setIsCPassSecure] = useState(true);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState({password: '', c_password: ''});
  const email = route.params.emailInput;
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const {isOTPVerified} = useSelector((state: RootState) => state.commonSlice);
  const handleChangePassPress = () => {
    if (validatePasswords() && err.password == '' && err.c_password == '') {
      changePassword();
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const onChangePass = (val: string) => {
    setPassInput(val);

    // Password length validation
    if (val.length > 0 && val.length < 8) {
      setErr(prevState => ({
        ...prevState,
        password: 'Password must be at least 8 characters long',
      }));
    } else {
      setErr(prevState => ({
        ...prevState,
        password: '',
      }));
    }

    // Only show mismatch error if confirm password is filled
    if (cPassInput && cPassInput.length > 0) {
      if (val !== cPassInput) {
        setErr(prevState => ({
          ...prevState,
          c_password: 'Passowrd and confirm password must be same',
        }));
      } else {
        setErr(prevState => ({
          ...prevState,
          c_password: '',
        }));
      }
    }
  };

  const onChangeCPass = (val: string) => {
    if (val.length > 0 && val !== passInput && err.password == '') {
      setErr(prevState => ({
        ...prevState,
        c_password: 'Passowrd and confirm password must be same',
        password: '',
      }));
    } else {
      setErr(prevState => ({
        ...prevState,
        c_password: '',
      }));
    }
    setCPassInput(val);
  };
  const handlePassSecure = () => {
    setIsPassSecure(!isPassSecure);
  };
  const handleCPassSecure = () => {
    setIsCPassSecure(!isCPassSecure);
  };

  const hanldeBackToLogin = () => {
    navigation.navigate('LOGIN');
  };

  const changePassword = async () => {
    setIsLoading(true);
    try {
      const response = await changePass(email, passInput, cPassInput);
      if (response) {
        console.log('response in changePass:', response);
        // navigation.navigate('LOGIN');
        setIsLoading(false);
        // dispatch(setIsPassChangedSuccess(true));
        setIsPopOpen(true);
      }
    } catch (err: any) {
      console.warn('Error in catch:', err);
      setIsLoading(false);
    }
  };

  const validatePasswords = () => {
    if (!passInput && err.c_password == '') {
      setErr(prevState => ({
        ...prevState,
        password: 'Password is required*',
      }));
      return false;
    } else if (!cPassInput && err.password == '') {
      setErr(prevState => ({
        ...prevState,
        c_password: 'Confirm Password is required*',
      }));
      return false;
    } else {
      return true;
    }
  };

  setTimeout(() => {
    dispatch(setIsOTPVerified(false));
  });
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
                <Text style={GLOBALSTYLE.authTitle}>Change Password</Text>
                <Text
                  style={[
                    GLOBALSTYLE.subTitle,
                    GLOBALSTYLE.mg_top_xs,
                    GLOBALSTYLE.text_center,
                  ]}>
                  Enter password and confirm password, this will be your new
                  password
                </Text>
              </View>
              <View>
                <Image source={forgotBg} style={GLOBALSTYLE.bg_img} />
              </View>
              <Input
                _WIDTH={'100%'}
                _ONCHANGE={onChangePass}
                _PLACEHOLDER="Enter Password"
                _VALUE={passInput.trim()}
                _LABEL={
                  <>
                    Password <Text style={GLOBALSTYLE.required}>*</Text>
                  </>
                }
                _IMG={isPassSecure ? eyeOpen : eyeClose}
                _SECURE={isPassSecure}
                _HANDLE_SECURE={handlePassSecure}
              />
              <Text style={GLOBALSTYLE.error_text}>{err.password}</Text>

              <Input
                _WIDTH={'100%'}
                _ONCHANGE={onChangeCPass}
                _PLACEHOLDER="Enter Confirm Password"
                _VALUE={cPassInput.trim()}
                _LABEL={
                  <>
                    Confirm Password <Text style={GLOBALSTYLE.required}>*</Text>
                  </>
                }
                _IMG={isCPassSecure ? eyeOpen : eyeClose}
                _SECURE={isCPassSecure}
                _HANDLE_SECURE={handleCPassSecure}
              />
              <Text style={GLOBALSTYLE.error_text}>{err.c_password}</Text>
              <View
                style={
                  Platform.OS === 'ios'
                    ? GLOBALSTYLE.no_margin
                    : GLOBALSTYLE.mg_top_s
                }>
                <Button
                  _TEXT="Change Password"
                  _ONPRESS={handleChangePassPress}
                  _BTNSTYLE={GLOBALSTYLE.btn_container}
                  _TEXT_STYLE={GLOBALSTYLE.button}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      {isPopOpen && (
        <Popup
          _TITLE={'Password Changed Successfully'}
          _DESCRIPTION={
            'Your account is ready to use. You will be redirected to the login page'
          }
          _BTN_TEXT={'Back to Login'}
          _ONPRESS={hanldeBackToLogin}
          _IMG={success}
        />
      )}

      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
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

export default ChangePass;
