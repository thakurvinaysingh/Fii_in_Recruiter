import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './StylePersonalProfile';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  backMain,
  calendarBlue,
  editImg,
  profilePlaceholder,
} from '../../../components/store/ImageStore';
import {
  ImagePicker,
  NativeStackNavigationProp,
  RH,
  useNavigation,
  useDispatch,
  useSelector,
  DateTimePicker,
} from '../../../components/store/ExternalLibrary';
import {
  Button,
  ChooseImagePopup,
  Dropdown,
  Input,
} from '../../../components/store/ComponentStore';
import {BottomTabParamList} from '../../../types/BottomTabParamList';
import {setIsProfileImgPopOpen} from '../../../redux/slices/CommonSlice';
import {RootState} from '../../../redux/store/Store';
import {gender, REGEX_EMAIL} from '../../../constants/Data';
import {personalProfile, updatePersonalProfile} from '../../../api/ApiServices';

interface profileDataType {
  address: string | null;
  created_at: string;
  dob: string | null;
  email: string;
  gender: string | null;
  id: number | null;
  name: string;
  profile: string | null;
}
const PersonalProfile = () => {
  const [profileData, setProfileData] = useState<profileDataType>();
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomTabParamList>>();
  const [nameInput, setNameInput] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [profileURL, setProfileURL] = useState(null);
  const [selectedGender, setSelectedGender] = useState('');
  const [isGenderPopOpen, setIsGenderPopOpen] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState('');
  const isImageChoosePopOpen = useSelector(
    (state: RootState) => state.commonSlice.isProfileImgPopOpen,
  );
  const [phoneInput, setPhoneInput] = useState('');
  // TEMPORARY DATA FOR UPDATE CHECKING
  const [aPIName, setAPIName] = useState('');
  const [aPIEmail, setAPIEmail] = useState('');
  const [aPIDob, setAPIDob] = useState(new Date());
  const [apiAddress, setApiAddress] = useState('');
  const [aPIProfile, setAPIProfile] = useState('');

  useEffect(() => {
    if (profileData?.name || profileData?.email) {
      setNameInput(profileData.name);
      setEmailInput(profileData.email);
    }
  }, [profileData]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState({name: '', email: ''});
  const handleDateCancel = () => {
    setIsDatePickerOpen(false);
  };
  const handleDateConfirm = () => {
    setSelectedDate(tempDate);
    setIsDatePickerOpen(false);
  };
  const dispatch = useDispatch();

  // ONCHAGE NAME AND VALIDATION
  const onChangeName = (val: string) => {
    const filteredName = val.replace(/[^a-zA-Z\s]/g, '');
    setNameInput(filteredName);
    if (val === ' ') {
      setNameInput('');
    } else if (val.length > 0 && val.length < 3) {
      setErr(prevState => ({
        ...prevState,
        name: 'Name should atleast 3 characters long',
      }));
    } else if (val.length > 0 && val.length > 30) {
      setErr(prevState => ({
        ...prevState,
        name: 'Name should no longer than 30 characters',
      }));
    } else {
      setErr(prevState => ({
        ...prevState,
        name: '',
      }));
    }
  };

  // ONCHAGE EMAIL AND VALIDATION
  const onChangeEmailInput = (val: string) => {
    if (val === ' ') {
      setEmailInput('');
    } else if (val.length > 0 && !REGEX_EMAIL.test(val) && err.name == '') {
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
  // GENDER SELECTION
  const handleGenderSelection = (item: string) => {
    setSelectedGender(item);
    setIsGenderPopOpen(false);
  };

  const handleChangeDescription = (val: string) => {
    setDescriptionInput(val);
  };

  const handleShowHideGender = () => {
    setIsGenderPopOpen(!isGenderPopOpen);
  };
  const handleBack = () => {
    navigation.goBack();
  };

  const handleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };
  // SHOW/HIDE IMAGE TYPE POPUP
  const handleChooseImageType = () => {
    dispatch(setIsProfileImgPopOpen(true));
  };

  // CLOSING THE POPUP
  const handleClose = () => {
    dispatch(setIsProfileImgPopOpen(false));
  };
  // OPENING THE POPUP
  const handleOpen = () => {
    dispatch(setIsProfileImgPopOpen(true));
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', {month: 'short'});
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  const handleDateChange = (event: any, newDate?: Date) => {
    if (newDate && Platform.OS == 'ios') {
      setTempDate(newDate);
    } else if (newDate && Platform.OS == 'android') {
      setSelectedDate(newDate);
      setIsDatePickerOpen(false);
    }
    if (Platform.OS === 'android') {
      setIsDatePickerOpen(false);
    }
  };

  // TAKING THE USER PERMISSION FOR PICTRURES
  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          );

          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);

          return (
            granted['android.permission.CAMERA'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED
          );
        }
      }
      return true;
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  };

  // PICKING UP THE PROFILE IMAGE FROM GALLERY
  const handleProfilePicker = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Camera or Storage permission is required.',
      );
      return;
    }
    try {
      dispatch(setIsProfileImgPopOpen(false));
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      }).then((image: any) => {
        console.log('Image URI:', image);
        setProfileURL(image.path);
      });
    } catch (err) {
      console.log('Error while picking up the picture');
    }
  };

  const handleCaptureImg = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Camera or Storage permission is required.',
      );
      return;
    }
    try {
      dispatch(setIsProfileImgPopOpen(false));
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
      }).then((image: any) => {
        console.log('Image URI:', image);
        setProfileURL(image.path);
      });
    } catch (err) {
      console.log('Error while picking up the picture');
    }
  };

  // GET USER PROFILE DATA
  const getPersonalProfile = async () => {
    setIsLoading(true);
    try {
      const respnse = await personalProfile();
      if (respnse.success) {
        console.log('response in get personal profile:', respnse?.data?.data);
        setIsLoading(false);
        setProfileData(respnse?.data?.data);
        setAPIName(respnse?.data?.data?.name);
        setAPIEmail(respnse?.data?.data?.email);
        setAPIDob(respnse?.data?.data?.dob);
        setAPIProfile(respnse?.data?.data?.profile);
      } else {
        console.warn('err in personal profile:', respnse.err);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.warn('Error in catch while getting personal profile data:', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPersonalProfile();
  }, []);

  // UPDATE USER PROFILE API
  // const updateUserProfile = async () => {
  //   let dateToUpdate = {
  //     name: nameInput,
  //     email: emailInput,
  //     location: selectedLocation,
  //     phone: phoneInput,
  //     gender: selectedGender,
  //     dob: selectedDate,
  //     profile: profileURL,
  //   };

  //   console.log('dateToUpdate:', dateToUpdate);
  //   try {
  //     const response = await updatePersonalProfile(dateToUpdate);
  //     if (response.success) {
  //       console.log('Profile updated successfully:', response.data);
  //     } else {
  //       console.warn('Error in update profile:', response.err);
  //     }
  //   } catch (err: any) {
  //     console.warn('Error while updating personal profile:', err);
  //   }
  // };

  // FORM VALIDATION - REQUIRED
  const validateForm = () => {
    if (!nameInput && err.email == '') {
      setErr(prevState => ({
        ...prevState,
        name: 'Name is required*',
      }));
      return false;
    } else if (!emailInput && err.name == '') {
      setErr(prevState => ({
        ...prevState,
        email: 'Email is required*',
      }));
      return false;
    } else {
      return true;
    }
  };

  // CONTINUE BUTTON
  const handleContinue = () => {
    if (validateForm() && err.name == '' && err.email == '') {
      // Alert.alert('Updated successfully');
      updateAPICall();
    } else {
      Alert.alert('Invalid form');
    }
  };

  const updateAPICall = () => {
    if (
      nameInput !== aPIName ||
      emailInput !== aPIEmail ||
      selectedGender ||
      descriptionInput !== apiAddress ||
      profileURL !== aPIProfile
    ) {
      console.log('update api should run');
      // updateUserProfile();
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <View style={GLOBALSTYLE.container}>
        <SafeAreaView>
          <View style={GLOBALSTYLE.flex}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
              hitSlop={30}>
              <Image source={backMain} style={GLOBALSTYLE.back_btn} />
            </TouchableOpacity>
            <Text style={GLOBALSTYLE.authTitle_small}>My Profile</Text>
            <Text></Text>
          </View>

          <KeyboardAvoidingView
            style={styles.mg_bottom}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? RH(3) : RH(7)}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={[
                  GLOBALSTYLE.mg_top_s,
                  {width: 130, alignSelf: 'center'},
                ]}>
                <TouchableOpacity
                  onPress={handleChooseImageType}
                  activeOpacity={0.7}>
                  {profileURL ? (
                    <Image
                      source={{uri: profileURL}}
                      style={styles.profile_img}
                    />
                  ) : (
                    <Image
                      source={profilePlaceholder}
                      style={styles.profile_img}
                    />
                  )}
                  <Image source={editImg} style={styles.edit_img} />
                </TouchableOpacity>
              </View>

              <View style={GLOBALSTYLE.mg_top_s}>
                <Input
                  _WIDTH={'100%'}
                  _ONCHANGE={onChangeName}
                  _PLACEHOLDER="Enter Name"
                  _VALUE={nameInput}
                  _LABEL={'Name'}
                />
                {err.name && (
                  <Text style={GLOBALSTYLE.error_text}>{err.name}</Text>
                )}
              </View>

              <View style={GLOBALSTYLE.mg_top_s}>
                <Input
                  _WIDTH={'100%'}
                  _ONCHANGE={onChangeEmailInput}
                  _PLACEHOLDER="Enter Address"
                  _VALUE={emailInput.trim()}
                  _LABEL={'Email Address'}
                />
                {err.email && (
                  <Text style={GLOBALSTYLE.error_text}>{err.email}</Text>
                )}
              </View>
              {/* <Dropdown
                _DATA={gender}
                _LABLE="Gender"
                _ITEM_PLACEHOLDER="Choose your gender"
                _SELECTED_ITEM={selectedGender}
                _IS_DROPDOWN_OPEN={isGenderPopOpen}
                _HANDLE_ITEM_SELECTION={handleGenderSelection}
                _SHOW_HIDE_DROPDOWN={handleShowHideGender}
              /> */}

              <View style={GLOBALSTYLE.mg_top_s}>
                <Text
                  style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                  Date of Birth
                </Text>
                <TouchableOpacity
                  onPress={handleDatePicker}
                  style={GLOBALSTYLE.dropdown_container}
                  activeOpacity={0.7}>
                  <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
                    {!selectedLocation ? (
                      <>
                        <Image
                          source={calendarBlue}
                          style={styles.calendar_img}
                        />
                        {!formatDate(selectedDate) ? (
                          <Text style={GLOBALSTYLE.input_title_grey}>
                            Choose Date here
                          </Text>
                        ) : (
                          <Text style={GLOBALSTYLE.input_title}>
                            {`${formatDate(selectedDate)}`}
                          </Text>
                        )}
                      </>
                    ) : (
                      <Text style={GLOBALSTYLE.input_title_red}>
                        {selectedLocation}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              <View style={[GLOBALSTYLE.mg_top_s]}>
                <Text
                  style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                  Address
                </Text>
                <TextInput
                  value={descriptionInput}
                  onChangeText={handleChangeDescription}
                  placeholder="A-5, Sec-24, Lorem Ipsum, United KIngdom"
                  placeholderTextColor={'grey'}
                  multiline
                  style={styles.input_area}
                />
              </View>
              <View style={GLOBALSTYLE.mg_top_s}>
                <Button
                  _TEXT="Continue"
                  _ONPRESS={handleContinue}
                  _BTNSTYLE={GLOBALSTYLE.btn_container}
                  _TEXT_STYLE={GLOBALSTYLE.button}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>

      {isImageChoosePopOpen && (
        <ChooseImagePopup
          _TITLE="Choose Profile"
          _SUBTITLE="Select source"
          _HANDLE_CAMERA={handleCaptureImg}
          _HANDLE_GALLERY={handleProfilePicker}
          _HANDLE_OPEN={handleOpen}
          _HANLDE_CLOSE={handleClose}
        />
      )}

      {isDatePickerOpen && (
        <View style={styles.date_picker_container}>
          <DateTimePicker
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            value={selectedDate}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
          <View style={styles.date_picker_box}>
            <Pressable style={styles.cancel_con} hitSlop={30}>
              <Text style={styles.picker_text} onPress={handleDateCancel}>
                Cancel
              </Text>
            </Pressable>
            <Pressable style={styles.confirm_con} hitSlop={30}>
              <Text style={styles.picker_text} onPress={handleDateConfirm}>
                Confirm
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}
    </>
  );
};

export default PersonalProfile;
