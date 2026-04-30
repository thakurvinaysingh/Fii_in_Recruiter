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
import styles from './StylePersonalProfile';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  backMain,
  editImg,
  placeholderBig,
} from '../../../components/store/ImageStore';
import {
  NativeStackNavigationProp,
  RH,
  useNavigation,
  useDispatch,
} from '../../../components/store/ExternalLibrary';
import {BottomTabParamList} from '../../../types/BottomTabParamList';
import {setIsProfileImgPopOpen} from '../../../redux/slices/CommonSlice';
import {personalProfile} from '../../../api/ApiServices';

interface profileDataType {
  address: string | null;
  created_at: string;
  dob: string | null;
  email: string | null;
  gender: string | null;
  id: number | null;
  name: string | null;
  profile: string | null;
}
const PersonalProfile = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomTabParamList>>();
  const [profileURL, setProfileURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState<profileDataType>();

  const handleBack = () => {
    navigation.goBack();
  };

  // SHOW/HIDE IMAGE TYPE POPUP
  const handleChooseImageType = () => {
    dispatch(setIsProfileImgPopOpen(true));
  };

  const getPersonalProfile = async () => {
    setIsLoading(true);
    try {
      const respnse = await personalProfile();
      if (respnse.success) {
        console.log('response in get personal profile:', respnse?.data?.data);
        setIsLoading(false);
        setProfileData(respnse?.data?.data);
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
            <Image source={editImg} style={styles.edit_img} />
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
                    <Image source={placeholderBig} style={styles.profile_img} />
                  )}
                </TouchableOpacity>
              </View>

              <View style={GLOBALSTYLE.mg_top_s}>
                <Text
                  style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                  Name
                </Text>
                <TouchableOpacity
                  style={GLOBALSTYLE.dropdown_container}
                  activeOpacity={0.7}>
                  <View style={GLOBALSTYLE.flex}>
                    <Text style={GLOBALSTYLE.input_title_grey}>
                      {profileData?.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={GLOBALSTYLE.mg_top_s}>
                <Text
                  style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                  Email Address
                </Text>
                <TouchableOpacity
                  style={GLOBALSTYLE.dropdown_container}
                  activeOpacity={0.7}>
                  <View style={GLOBALSTYLE.flex}>
                    <Text style={GLOBALSTYLE.input_title_grey}>
                      {profileData?.email}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* <View style={GLOBALSTYLE.mg_top_s}>
                <Text
                  style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                  Phone No.
                </Text>
                <TouchableOpacity
                  style={GLOBALSTYLE.dropdown_container}
                  activeOpacity={0.7}>
                  <View style={GLOBALSTYLE.flex}>
                    <Text style={GLOBALSTYLE.input_title_grey}>
                      {profileData?.}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View> */}

              <View style={GLOBALSTYLE.mg_top_s}>
                <Text
                  style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                  Address
                </Text>
                <TouchableOpacity
                  style={GLOBALSTYLE.dropdown_container}
                  activeOpacity={0.7}>
                  <View style={GLOBALSTYLE.flex}>
                    <Text style={GLOBALSTYLE.input_title_grey}>
                      {profileData?.address}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={GLOBALSTYLE.mg_top_s}>
                <Text
                  style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                  Gender
                </Text>
                <TouchableOpacity
                  style={GLOBALSTYLE.dropdown_container}
                  activeOpacity={0.7}>
                  <View style={GLOBALSTYLE.flex}>
                    <Text style={GLOBALSTYLE.input_title_grey}>
                      {profileData?.gender}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={GLOBALSTYLE.mg_top_s}>
                <Text
                  style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                  Date Of Birth
                </Text>
                <TouchableOpacity
                  style={GLOBALSTYLE.dropdown_container}
                  activeOpacity={0.7}>
                  <View style={GLOBALSTYLE.flex}>
                    <Text style={GLOBALSTYLE.input_title_grey}>
                      {profileData?.dob}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}
    </>
  );
};

export default PersonalProfile;
