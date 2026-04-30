import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  backMain,
  editImg,
  profilePlaceholder,
} from '../../../components/store/ImageStore';
import {
  ImagePicker,
  NativeStackNavigationProp,
  RNFS,
  useDispatch,
  useSelector,
  useNavigation,
} from '../../../components/store/ExternalLibrary';
import styles from './StyleCompleteProfile';
import {
  setChoosePhotoOpen,
  setContactName,
  setContactNameError,
  setDoc,
  setDocName,
  setEmail,
  setEstablishedError,
  setEstablishedYear,
  setLocation,
  setLookingFor,
  setOtherRoles,
  setPhone,
  setPinCode,
  setPostCodeError,
  setPracticeName,
  setPracticeNameError,
  setProfile,
  setProfileId,
  setRole,
  setSelectedService,
  setServiceOther,
  setSoftwarePractice,
  setStaff,
  setTeamSize,
  setWorkingHours,
  setWorkingHoursError,
  setWebLink,
  setDescriptionInput,
} from '../../../redux/slices/ProfileSlice';
import {
  Button,
  ChangeEmailPopup,
  ChangePhonePopup,
  ChooseImagePopup,
  ContactInfo,
  PracticeInfo,
  StaffingRequirements,
  ToastPopup,
} from '../../../components/store/ComponentStore';
import {requestPermissions} from './CameraPermission';
import {RootState} from '../../../redux/store/Store';
import {
  gettingDynamicData,
  personalProfile,
  updatePersonalProfile,
} from '../../../api/ApiServices';
import {DynamicDataIF} from '../../../types/DropdownTypes';
import {MainStackIF} from '../../../types/MainStackTypes';
import {Platform} from 'react-native';
import {
  setIsOTPVerifiedSucess,
  setIsOTPVerifiedSucessEmail,
  setIsProfileCompleted,
} from '../../../redux/slices/CommonSlice';
type navigationProp = NativeStackNavigationProp<MainStackIF>;

interface profileDataType {
  id: number;
  name: string;
  email: string;
  practice_name: string;
  established_year: string;
  practice_size: string;
  primarly_looking: string;
  working_hours: string[];
  looking: number[];
  dentistry: string;
  other_dentistry: string;
  practice_role: number[];
  other_practice_role: string;
  use_software: number[];
  address: string;
  profile: string;
  document: string;
  document_name: string;
  phone: string;
  postcode: string;
  web_link: string;
  description: string;
}

const Profile = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [profileData, setProfileData] = useState<profileDataType>();
  const navigation = useNavigation<navigationProp>();

  const [dynamicData, setDynamicData] = useState<DynamicDataIF>({
    profession: [],
    employment_types: [],
    require_document: [],
    qualification: [],
    language: [],
    software: [],
    vaccination: [],
    locationRange: [],
    environment: [],
    practiceRole: [],
  });

  const {
    id,
    choosePhotoOpen,
    profile,
    practiceInformation,
    contactInformation,
    staffingRequirements,
  } = useSelector((state: RootState) => state.profileSlice);
  const handleImagePicker = () => {
    dispatch(setChoosePhotoOpen(true));
  };

  useEffect(() => {
    dispatch(setIsOTPVerifiedSucess(false));
    dispatch(setIsOTPVerifiedSucessEmail(false));
  }, []);

  const {
    isChangeEmailOpen,
    isOTPVerifiedSucess,
    isChangePhoneOpen,
    isOTPVerifiedSucessEmail,
  } = useSelector((state: RootState) => state.commonSlice);
  const removeOher = (value: number[]) => {
    if (value.includes(-1)) {
      let filtered = value.filter(item => item !== -1);
      return filtered;
    } else {
      return value;
    }
  };

  const allData = {
    ...practiceInformation,
    ...contactInformation,
    ...staffingRequirements,
  };

  let profileFormattedData = {
    id,
    name: allData.contactName,
    practice_name: allData.practiceName,
    established_year: allData.establishedYear,
    practice_size: allData.selectedTeamSize,
    location: allData.location,
    primarly_looking: allData.selectedLookingFor,
    working_hours: allData.selectedWorkingHours,
    other_practice_role: allData.otherRoles,
    other_use_software: allData.softwarePracticeOther,
    looking: removeOher(allData.selectedStaff),
    practice_role: allData.selectedRole,
    use_software: removeOher(allData.selectedSoftwarePractice),
    practice_phone: allData.phone,
    profile: profile,
    other_dentistry: allData.serviceOther,
    dentistry: removeOher(allData.selectedService),
    document: allData.doc,
    document_name: allData.docName,
    postcode: allData.pinCode,
    description: allData.descriptionInput,
    web_link: allData.webLink,
  };

  // CONVERTING HTTPS URLS TO BASE64
  const convertUrlToBase64 = async (url: string): Promise<string | null> => {
    if (!url) return null;

    try {
      const fileName = url.split('/').pop() || 'file';
      const localPath = `${RNFS.CachesDirectoryPath}/${fileName}`;
      const fileExt = fileName.split('.').pop()?.toLowerCase() || '';

      // Download the file
      const download = await RNFS.downloadFile({
        fromUrl: url,
        toFile: localPath,
      }).promise;

      if (download.statusCode !== 200) {
        console.warn('Download failed', download.statusCode);
        return null;
      }

      // Read file as base64
      const base64 = await RNFS.readFile(localPath, 'base64');
      // Determine MIME type based on file extension
      const mimeTypes: Record<string, string> = {
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ppt: 'application/vnd.ms-powerpoint',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        txt: 'text/plain',
      };

      const mimeType = mimeTypes[fileExt] || 'application/octet-stream';

      // Clean up temporary file
      try {
        await RNFS.unlink(localPath);
      } catch (cleanupError) {
        console.warn('Failed to clean up temporary file:', cleanupError);
      }

      return `data:${mimeType};base64,${base64}`;
    } catch (error) {
      console.error('Error converting URL to base64:', error);
      return null;
    }
  };

  const dispatchingProfileData = (apiData: profileDataType) => {
    dispatch(setPracticeName(apiData.practice_name));
    dispatch(setContactName(apiData.name));
    dispatch(setEmail(apiData.email));
    dispatch(setEstablishedYear(apiData.established_year));
    dispatch(setTeamSize(apiData.practice_size));
    dispatch(setLookingFor(apiData.primarly_looking));
    dispatch(setWorkingHours(apiData.working_hours));
    dispatch(setStaff(apiData.looking));
    dispatch(setSelectedService(apiData.dentistry));
    dispatch(setServiceOther(apiData.other_dentistry));
    dispatch(setRole(apiData.practice_role));
    dispatch(setOtherRoles(apiData.other_practice_role));
    dispatch(setSoftwarePractice(apiData.use_software));
    dispatch(setLocation(apiData.address));
    dispatch(setDocName(apiData.document_name));
    dispatch(setPhone(apiData.phone));
    dispatch(setPinCode(apiData.postcode));
    dispatch(setWebLink(apiData.web_link));
    dispatch(setDescriptionInput(apiData.description));
    convertUrlToBase64(apiData.profile).then(base64Profile => {
      if (base64Profile) {
        dispatch(setProfile(base64Profile));
      }
    });
    convertUrlToBase64(apiData.document).then(base64Doc => {
      if (base64Doc) {
        dispatch(setDoc(base64Doc));
      }
    });
  };

  // GETTING THE DYNAMIC DATA THAT WILL SHOWING THE DROPDOWN CHECKBOXES, AND RADIOS
  const getDynamicDa = async () => {
    try {
      const res = await gettingDynamicData();
      if (res.success) {
        console.log('res of dynamic data:', res.data.data);
        setDynamicData(res.data.data);
      } else {
        console.warn('Error in dynamic data:', res.err);
      }
    } catch (err: any) {
      console.error('Error in dynamic data in catch:', err);
    }
  };

  // UPDATE USER PROFILE API
  const updateUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await updatePersonalProfile(profileFormattedData);
      if (response.success) {
        console.log('Profile updated successfully:');
        setIsLoading(false);
        setIsProfileCreated(true);
        navigation.navigate('BOTTOM_TAB', {});
        dispatch(setIsProfileCompleted(1));
      } else {
        console.warn('Error in update profile:', response.err);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.warn('Error while updating personal profile:', err);
      setIsLoading(false);
    }
  };

  const validateProfile = () => {
    if (!allData.practiceName) {
      dispatch(setPracticeNameError('Practice Name is required*'));
      return false;
    } else if (!allData.establishedYear) {
      dispatch(setEstablishedError('Established Year is required*'));
      return false;
    }
    //  else if (!allData.location) {
    //   dispatch(setLocationError('Location is required*'));
    //   return false;
    // }
    else if (!allData.pinCode) {
      dispatch(setPostCodeError('Zip Code is required*'));
      return false;
    } else if (!allData.contactName) {
      dispatch(setContactNameError('Contact Name is required*'));
      return false;
    } else if (allData.selectedWorkingHours.length == 0) {
      dispatch(setWorkingHoursError('Working Hours are required*'));
      return false;
    } else if (allData.webLinkErr) {
      return false;
    } else {
      dispatch(setEstablishedError(''));
      return true;
    }
  };

  const handleUpdatePress = () => {
    if (validateProfile()) {
      updateUserProfile();
    }
  };

  useEffect(() => {
    getDynamicDa();
    getPersonalProfile();
  }, []);

  const getPersonalProfile = async () => {
    setIsLoading(true);
    try {
      const respnse = await personalProfile();
      if (respnse.success) {
        console.log('response in get personal profile:', respnse?.data?.data);
        setIsLoading(false);
        dispatch(setProfileId(respnse?.data?.data?.id));
        setProfileData(respnse?.data?.data);
        dispatchingProfileData(respnse?.data?.data);
      } else {
        console.warn('err in personal profile:', respnse.err);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.warn('Error in catch while getting personal profile data:', err);
      setIsLoading(false);
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
      dispatch(setChoosePhotoOpen(false));
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        compressImageQuality: 0.5,
      }).then(async (image: any) => {
        const base64 = await RNFS.readFile(image?.path, 'base64');
        const ext = image?.path?.split('.').pop();
        const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
        const fullBase64 = `data:${mime};base64,${base64}`;
        dispatch(setProfile(fullBase64));
      });
    } catch (err) {
      console.log('Error while picking up the picture', err);
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
      dispatch(setChoosePhotoOpen(false));
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        compressImageQuality: 0.5,
      }).then(async (image: any) => {
        const base64 = await RNFS.readFile(image.path, 'base64');
        const ext = image.path.split('.').pop();
        const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
        const fullBase64 = `data:${mime};base64,${base64}`;
        dispatch(setProfile(fullBase64));
      });
    } catch (err) {
      console.log('Error while picking up the picture', err);
    }
  };

  // CLOSING THE POPUP
  const handleClose = () => {
    dispatch(setChoosePhotoOpen(false));
  };
  // OPENING THE POPUP
  const handleOpen = () => {
    dispatch(setChoosePhotoOpen(true));
  };

  const handleBack = () => {
    navigation.navigate('ACCOUNT');
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('ACCOUNT');
        return true;
      },
    );

    return () => backHandler.remove();
  }, [navigation]);

  setTimeout(() => {
    if (isProfileCreated) {
      setIsProfileCreated(false);
    }
  }, 3000);
  return (
    <>
      <SafeAreaView style={GLOBALSTYLE.safeContainer}>
        {/* HEADER */}
        <View style={GLOBALSTYLE.container}>
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {/* PROFILE IMAGE */}
            <TouchableOpacity
              style={styles.center}
              onPress={handleImagePicker}
              activeOpacity={0.7}>
              {profile ? (
                <Image source={{uri: profile}} style={styles.profile_img} />
              ) : (
                <Image source={profilePlaceholder} style={styles.profile_img} />
              )}
              <Image source={editImg} style={styles.edit_img} />
            </TouchableOpacity>

            {/* OTHER COMPONENTS */}
            <PracticeInfo dynamicData={dynamicData} />
            <ContactInfo dynamicData={dynamicData} />
            <StaffingRequirements dynamicData={dynamicData} />

            <View
              style={[
                Platform.OS == 'ios'
                  ? GLOBALSTYLE.mg_top_s
                  : [GLOBALSTYLE.mg_top_s, GLOBALSTYLE.mg_bottom_xs],
              ]}>
              <Button
                _TEXT="Update Profile"
                _ONPRESS={handleUpdatePress}
                _BTNSTYLE={GLOBALSTYLE.btn_container}
                _TEXT_STYLE={GLOBALSTYLE.button}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      {choosePhotoOpen && (
        <ChooseImagePopup
          _TITLE="Choose Picture"
          _SUBTITLE="Select source"
          _HANDLE_CAMERA={handleCaptureImg}
          _HANDLE_GALLERY={handleProfilePicker}
          _HANDLE_OPEN={handleOpen}
          _HANLDE_CLOSE={handleClose}
        />
      )}

      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}

      {isOTPVerifiedSucessEmail && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Email has been changed"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}

      {isOTPVerifiedSucess && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Phone has been changed"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}

      {isProfileCreated && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Profile Updated Successfully!"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}

      {isChangeEmailOpen && <ChangeEmailPopup />}

      {isChangePhoneOpen && <ChangePhonePopup />}
    </>
  );
};

export default Profile;
