import {
  ActivityIndicator,
  Alert,
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
import {
  apple,
  authLogo,
  checked,
  eyeClose,
  eyeOpen,
  facebook,
  google,
  unchecked,
} from '../../../components/store/ImageStore';
import {Button, Input} from '../../../components/store/ComponentStore';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  NativeStackNavigationProp,
  RH,
  useNavigation,
  useDispatch,
  useFocusEffect,
} from '../../../components/store/ExternalLibrary';
import {AuthStackParamList} from '../../../types/AuthStack';
import {register} from '../../../api/ApiServices';
import {REGEX_EMAIL} from '../../../constants/Data';
const Register = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [cPassInput, setCPassInput] = useState('');
  const [isPassSecure, setIsPassSecure] = useState(true);
  const [isCPassSecure, setIsCPassSecure] = useState(true);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const dispatch = useDispatch();
  const [err, setErr] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    c_password: '',
  });

  const registerDetail = {
    name: nameInput,
    email: emailInput,
    phone: phoneInput,
    password: passInput,
    password_confirmation: cPassInput,
  };

  console.log('registerDetail:', registerDetail);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      setNameInput('');
      setEmailInput('');
      setPhoneInput('');
      setPassInput('');
      setCPassInput('');
      setIsAgreed(false);
    }, []),
  );
  // ONCHAGE NAME AND VALIDATION
  const onChangeName = (val: string) => {
    const formattedText = val.replace(/\s{2,}/g, ' ');
    setNameInput(formattedText);
    if (val === ' ') {
      setNameInput('');
    } else if (val.length > 0 && val.length < 3) {
      setErr(prevState => ({
        ...prevState,
        name: 'Name should atleast 3 character long',
      }));
    } else if (val.length > 0 && val.length > 30) {
      setErr(prevState => ({
        ...prevState,
        name: 'Name should no longer than 30 character',
      }));
    } else {
      setErr(prevState => ({
        ...prevState,
        name: '',
      }));
    }
  };

  // ONCHAGE EMAIL AND VALIDATION
  const onChangeEmail = (val: string) => {
    if (val === ' ') {
      setEmailInput('');
    } else if (
      val.length > 0 &&
      !REGEX_EMAIL.test(val) &&
      err.name == '' &&
      err.password == '' &&
      err.c_password == ''
    ) {
      setErr(prevState => ({
        ...prevState,
        email: 'Email is not valid',
      }));
    } else {
      setErr(prevState => ({
        ...prevState,
        email: '',
      }));
    }
    setEmailInput(val);
  };

  const onChangePhone = (val: string) => {
    setPhoneInput(val);
    if (val === ' ') {
      setPhoneInput('');
    } else if (
      val.length > 0 &&
      val.length < 10 &&
      err.name == '' &&
      err.password == '' &&
      err.c_password == ''
    ) {
      setErr(prevState => ({
        ...prevState,
        phone: 'Phone should be 10 digits long',
      }));
    } else {
      setErr(prevState => ({
        ...prevState,
        phone: '',
      }));
    }
  };

  const onChangePass = (val: string) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

    if (!strongPasswordRegex.test(val) && val) {
      setErr(prevState => ({
        ...prevState,
        password:
          'Password must include uppercase, lowercase, number, and special character',
      }));
    } else if (val.length < 8 && val) {
      setErr(prevState => ({
        ...prevState,
        password: 'Password must be at least 8 characters long',
      }));
    } else if (val.length > 20) {
      setErr(prevState => ({
        ...prevState,
        password: 'Password must not exceed 20 characters',
      }));
    } else {
      setErr(prevState => ({
        ...prevState,
        password: '',
      }));
    }

    setPassInput(val);
  };

  // ONCHAGE CONFIRM PASS AND VALIDATION
  const onChangeCPass = (val: string) => {
    if (
      val.length > 0 &&
      val !== passInput &&
      err.name == '' &&
      err.email == '' &&
      err.password == ''
    ) {
      setErr(prevState => ({
        ...prevState,
        c_password: 'Password and Confirm Password must be same',
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

  const handleSignUPPress = () => {
    registerUser();
    // navigation.navigate('LOGIN');
  };

  const handleLogin = () => {
    navigation.navigate('LOGIN');
  };

  const handleTermsConditions = () => {
    setIsAgreed(!isAgreed);
  };

  // VALIDATING REGISTER FORM
  const validateUser = () => {
    if (
      !nameInput &&
      err.email == '' &&
      err.password == '' &&
      err.c_password == '' &&
      err.phone == ''
    ) {
      setErr(prevState => ({
        ...prevState,
        name: 'Name is required*',
      }));
      return false;
    } else if (
      !emailInput &&
      err.name == '' &&
      err.password == '' &&
      err.c_password == ''
    ) {
      setErr(prevState => ({
        ...prevState,
        email: 'Email is required*',
      }));
      return false;
    } else if (
      !phoneInput &&
      err.name == '' &&
      err.password == '' &&
      err.c_password == ''
    ) {
      setErr(prevState => ({
        ...prevState,
        phone: 'Phone is required*',
      }));
      return false;
    } else if (
      !passInput &&
      err.name == '' &&
      err.email == '' &&
      err.c_password == ''
    ) {
      setErr(prevState => ({
        ...prevState,
        password: 'Password is required*',
      }));
      return false;
    } else if (
      !cPassInput &&
      err.name == '' &&
      err.email == '' &&
      err.password == ''
    ) {
      setErr(prevState => ({
        ...prevState,
        c_password: 'Confirm Password is required*',
      }));
      return false;
    } else if (
      !isAgreed &&
      err.name == '' &&
      err.email == '' &&
      err.password == '' &&
      err.c_password == ''
    ) {
      Alert.alert('Please agree with our terms and conditions to continue');
      return false;
    } else if (
      err.name == '' &&
      err.email == '' &&
      err.password == '' &&
      err.c_password == ''
    ) {
      return true;
    }
  };
  // REGISTER USER
  const registerUser = async () => {
    setIsLoading(true);

    if (validateUser()) {
      try {
        const response = await register(registerDetail);
        console.log(response,'response-------')
        if (response.success) {
          setIsLoading(false);
          navigation.navigate('OTP_VERIFICATION', {
            emailInput,
            fromForgot: false,
          });
          console.log('res of register:', response.data);
        } else if (response.err === 'The email has already been taken.') {
          setErr(prevState => ({
            ...prevState,
            email: 'This email is already teken',
          }));
          setIsLoading(false);
        } else {
          console.log('Error in register api:', response.err);
          setIsLoading(false);
        }
      } catch (err: any) {
        console.warn('Somthing went wrong with register api:', err);
        setIsLoading(false);
      }
    } else {
      console.log('validat user first');
      validateUser();
      setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={GLOBALSTYLE.safeContainer}>
        <View style={GLOBALSTYLE.container}>
          <Image source={authLogo} style={[GLOBALSTYLE.auth_logo]} />
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={RH(5.5)}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled">
              <View style={[GLOBALSTYLE.mg_top_xs]}>
                <Text style={GLOBALSTYLE.authTitle}>Create Account</Text>
                {/* <Text
                  style={[
                    GLOBALSTYLE.subTitle,
                    GLOBALSTYLE.mg_top_xs,
                    GLOBALSTYLE.text_center,
                  ]}>
                  Fill your information below or register with your social
                  account
                </Text> */}
              </View>

              <View style={GLOBALSTYLE.mg_top_xs}>
                <Input
                  _WIDTH={'100%'}
                  _ONCHANGE={onChangeName}
                  _PLACEHOLDER="Enter Name"
                  _VALUE={nameInput}
                  _LABEL={
                    <>
                      Name <Text style={GLOBALSTYLE.required}>*</Text>
                    </>
                  }
                />

                <Text style={GLOBALSTYLE.error_text}>{err.name}</Text>
              </View>

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
              <Text style={GLOBALSTYLE.error_text}>{err.email}</Text>
              <Input
                _WIDTH={'100%'}
                _ONCHANGE={onChangePhone}
                _PLACEHOLDER="Enter Phone"
                _VALUE={phoneInput}
                _MAX_LENGTH={10}
                _KEYBOARDTYPE="number-pad"
                _LABEL={
                  <>
                    Phone <Text style={GLOBALSTYLE.required}>*</Text>
                  </>
                }
              />
              <Text style={GLOBALSTYLE.error_text}>{err.phone}</Text>
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
              <View>
                <TouchableOpacity
                  hitSlop={10}
                  onPress={handleTermsConditions}
                  style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}
                  activeOpacity={0.6}>
                  <Image
                    source={isAgreed ? checked : unchecked}
                    style={GLOBALSTYLE.check_box}
                  />
                  <Text style={GLOBALSTYLE.subTitle}>
                    Agree with{' '}
                    <Text
                      style={GLOBALSTYLE.subTitleActive}
                      onPress={() => console.log('working')}>
                      Terms & Conditions
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={GLOBALSTYLE.mg_top_s}>
                <Button
                  _TEXT="Sign Up"
                  _ONPRESS={handleSignUPPress}
                  _BTNSTYLE={GLOBALSTYLE.btn_container}
                  _TEXT_STYLE={GLOBALSTYLE.button}
                />
              </View>

              <View
                style={[
                  GLOBALSTYLE.flex,
                  GLOBALSTYLE.mg_top_xs,
                  GLOBALSTYLE.mg_bottom_xs,
                ]}>
                <View style={GLOBALSTYLE.line}></View>
                <Text style={GLOBALSTYLE.subTitle}>OR</Text>
                <View style={GLOBALSTYLE.line}></View>
              </View>
              <View
                style={[
                  Platform.OS == 'ios'
                    ? GLOBALSTYLE.flex
                    : GLOBALSTYLE.flex_even_space,
                  ,
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
              <View>
                <Text
                  style={[
                    GLOBALSTYLE.subTitle,
                    GLOBALSTYLE.mg_top_xs,
                    GLOBALSTYLE.text_center,
                  ]}>
                  Already have an account?{' '}
                  <Text
                    style={GLOBALSTYLE.subTitleActive}
                    onPress={handleLogin}>
                    Sign In
                  </Text>
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}
    </>
  );
};

export default Register;
