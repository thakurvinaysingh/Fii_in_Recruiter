import {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  aboutIcon,
  applicants,
  backMain,
  interviewIcon,
  logoutIcon,
  privacyIcon,
  profilePlaceholder,
  ratingIcon,
  work2,
} from '../../../components/store/ImageStore';
import styles from './StyleAccount';
import ProfileSection from '../../../components/profile/ProfileSection';
import {
  NativeStackNavigationProp,
  useNavigation,
  useDispatch,
  useSelector,
} from '../../../components/store/ExternalLibrary';
import {MainStackIF} from '../../../types/MainStackTypes';
import {setIsLogoutPopOpen} from '../../../redux/slices/CommonSlice';
import {RootState} from '../../../redux/store/Store';
const Account = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const {profileImg} = useSelector((state: RootState) => state.commonSlice);
  const clinicName = useSelector(
    (state: RootState) => state.commonSlice.clinicName,
  );
  const dispatch = useDispatch();
  const handlePrivacyPolicy = () => {
    navigation.navigate('PRIVACY_POLICY');
  };

  const handleAbout = () => {
    navigation.navigate('ABOUT');
  };

  const handleScheduled = () => {
    navigation.navigate('SCHEDULED_INTERVIEWS');
    // Alert.alert('Under Developement');
  };

  const handleCompleteProfile = () => {
    navigation.navigate('PROFILE', {comeFrom: 'account'});
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('BOTTOM_TAB', {});
        return true;
      },
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleRatingReviews = () => {
    navigation.navigate('MY_RATING_REVIEWS');
    // Alert.alert("Under Development")
  };

  const handleLogout = () => {
    dispatch(setIsLogoutPopOpen(true));
  };

  const handlePersonalProfile = () => {
    navigation.navigate('PROFILE', {comeFrom: 'account'});
  };
  const handleListOfApplicants = () => {
    navigation.navigate('LIST_APPLICANTS', {comeFrom: 'account'});
  }
  const handleBack = () => {
    navigation.navigate('BOTTOM_TAB', {});
    // navigation.goBack();
  };

  const handlePostedJobs = () => {
    navigation.navigate('ALL_JOBS', {comeFrom: 'account'});
  };
  return (
    <>
      <View style={GLOBALSTYLE.container}>
        <SafeAreaView>
          <View style={[GLOBALSTYLE.flex, GLOBALSTYLE.mg_bottom_xs]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
              hitSlop={30}>
              <Image source={backMain} style={GLOBALSTYLE.back_btn} />
            </TouchableOpacity>
            <Text style={GLOBALSTYLE.authTitle_small}>My Account</Text>
            <Text></Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mg_bottom}>
              <View>
                <View style={GLOBALSTYLE.mg_bottom_xs}>
                  {/* <View style={styles.cricle_container}>
                  <View style={styles.outer_circle}>
                    <View style={styles.inner_circle}></View>
                  </View> */}
                  {!profileImg ? (
                    <Image
                      source={profilePlaceholder}
                      style={styles.profile_img}
                    />
                  ) : (
                    <Image
                      source={{uri: profileImg}}
                      style={styles.profile_img}
                    />
                  )}
                  {/* </View> */}
                </View>
                {clinicName && (
                  <Text
                    style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.text_center]}>
                    {clinicName}
                  </Text>
                )}
                <Text
                  style={[GLOBALSTYLE.subTitleActive, GLOBALSTYLE.text_center]}
                  onPress={handleCompleteProfile}>
                  Compelete Profile
                </Text>
              </View>

              <View style={GLOBALSTYLE.mg_top_s}>
                <TouchableOpacity onPress={handlePersonalProfile}>
                  <ProfileSection _IMAGE={applicants} _TITLE="My Profile" />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleListOfApplicants}>
                  <ProfileSection _IMAGE={applicants} _TITLE="List of Applicants" />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={handleApplicants}>
                  <ProfileSection
                    _IMAGE={applicantsIcon}
                    _TITLE="Job Applicants"
                  />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={handlePostedJobs}>
                  <ProfileSection _IMAGE={work2} _TITLE="My Jobs" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleScheduled} activeOpacity={0.7}>
                  <ProfileSection
                    _IMAGE={interviewIcon}
                    _TITLE="Scheduled Interviews"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleRatingReviews}>
                  <ProfileSection
                    _IMAGE={ratingIcon}
                    _TITLE="My Ratings & Reviews"
                  />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={handleAbout}>
                  <ProfileSection _IMAGE={aboutIcon} _TITLE="About Us" />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handlePrivacyPolicy}>
                  <ProfileSection
                    _IMAGE={privacyIcon}
                    _TITLE="Privacy Policy"
                  />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
                  <ProfileSection _IMAGE={logoutIcon} _TITLE="Logout" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Account;
