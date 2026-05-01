import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  Alert,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  backMain,
  call,
  chat,
  ellipsFilled,
  experienceProfile,
  locationBlue,
  patientProfile,
  placeholderBig,
  reportFlag,
  right,
  starYellow,
  starYellowHalf,
  successRate,
} from '../../../components/store/ImageStore';
import {
  NativeStackNavigationProp,
  RBSheet,
  RouteProp,
  useNavigation,
  useRoute,
  useDispatch,
  RH,
  RNFetchBlob,
  useSelector,
  useFocusEffect,
} from '../../../components/store/ExternalLibrary';
import {MainStackIF} from '../../../types/MainStackTypes';
import {
  BottomSheet,
  Button,
  ReportPopup,
  ToastPopup,
  TransparentButton,
} from '../../../components/store/ComponentStore';
import styles from './StyleCandidateProfile';
import {environmentData} from '../../../constants/Data';
import {CandidateFormData} from '../../../types/DataTypes';
import {updattingJobStatus, viewApplicants} from '../../../api/ApiServices';
import {
  setIsReportJobOpen,
  setIsReportSuccess,
  setIsReviewBottomSheetOpen,
} from '../../../redux/slices/CommonSlice';
import Theme from '../../../theme/Theme';
import {setReviewPhoto} from '../../../redux/slices/ProfileSlice';
import {RootState} from '../../../redux/store/Store';
type routeProp = RouteProp<MainStackIF, 'CANDIDATE_PROFILE'>;
const CandidateProfile = () => {
  const routes = useRoute<routeProp>();
  const params = routes.params;
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef<typeof RBSheet | any>(null);
  const dispatch = useDispatch();
  const [profileCompleteLocal, setProfileCompleteLocal] = useState(true);
  const [isScheduleLocal, setIsScheduleLocal] = useState(true);
  const {auth_token, isProfileCompleted, isReportJobOpen, isReportSuccess} =
    useSelector((state: RootState) => state.commonSlice);
  const [isFileDownloaded, setIsFileDownloaded] = useState(false);
  const [profileData, setProfileData] = useState<CandidateFormData>({
    id: 0,
    name: '',
    email: '',
    phone: '',
    location: '',
    type_of_experiance: '',
    year_of_experiance: '',
    other_qualification: '',
    other_software: '',
    other_vaccination: '',
    hourly_rate: '',
    availability_time: '',
    short_notice: '',
    permanent_opportunities: '',
    childrens_check: '',
    valid_police_check: '',
    first_aid_certicate: '',
    working_in_dentistry: '',
    environment_thrive: [],
    fun_fact: '',
    document_name: '',
    profession: '',
    software_experiance: [],
    qualification: [],
    vaccination: [],
    language: [],
    profile: '',
    rating: 0,
    review_count: 0,
    document: '',
    reviews: [],
    is_review: 0,
    applied_our_Job: 0,
    is_schedule: 0,
    is_report: 0,
    candidate_availibity: {},
  });

  const handleBack = () => {
    setTimeout(() => {
      navigation.goBack();
    });
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => backHandler.remove();
  }, [navigation]);

  // SHOW THE LABLE INSTEAN VALUES IN THRIVE IN
  const environmentLabels = profileData?.environment_thrive?.map(value => {
    const match = environmentData.find((env: any) => env.value === value);
    return match?.key ?? `${value}`;
  });

  const handleChatBtn = () => {
    if (isProfileCompleted) {
      navigation.navigate('SINGLE_MESSAGE', {
        candidateId: profileData.id,
        candidateName: profileData.name,
        candidateProfile: profileData.profile,
      });
    } else {
      setProfileCompleteLocal(false);
    }
  };
  const handleInterviewPress = () => {
    // Recruiter taps "Schedule Interview" / "Reschedule Interview".
    // Always route to the new month-view calendar screen. The calendar
    // itself decides whether the recruiter is creating a new interview
    // or rescheduling an existing one (based on the API result).
    navigation.navigate('INTERVIEW_CALENDAR', {
      candidateId: profileData.id,
      jobId: params.jobId,
    });
  };

  const paramsToPass = {
    name: profileData.name,
    profession: profileData.profession,
    review_count: profileData.review_count,
    rating: profileData.rating,
    reviews: profileData.reviews,
    profile: profileData.profile,
  };

  const handleRating = () => {
    if (profileData.review_count >= 1) {
      navigation.navigate('RATING_REVIEWS', {
        name: profileData.name,
        profession: profileData.profession,
        reviewCount: profileData.review_count,
        rating: profileData.rating,
        reviews: profileData.reviews,
        profile: profileData.profile,
      });
    }
  };

  const handleReviewPress = () => {
    if (isProfileCompleted) {
      dispatch(setIsReviewBottomSheetOpen(true));
      refRBSheet.current?.open();
      dispatch(setReviewPhoto(''));
    } else {
      setProfileCompleteLocal(false);
    }
  };

  const formatRating = (rating: number) => {
    return parseFloat(rating?.toFixed(1));
  };

  setTimeout(() => {
    setIsFileDownloaded(false);
    setProfileCompleteLocal(true);
    dispatch(setIsReportSuccess(false));
  }, 3000);
  // DOWNLOADING THE RESUME
  const actualDownload = () => {
    const invoiceUrl = profileData.document;
    const {dirs} = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    const configfb = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `Invoice.pdf`,
        path: `${dirs.DownloadDir}/Invoice.pdf`,
      },
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: 'Invoice.pdf',
      path: `${dirToSave}/Invoice.pdf`,
    };
    const configOptions = Platform.select({
      ios: configfb,
      android: configfb,
    });

    RNFetchBlob.config(configOptions || {})
      .fetch('GET', invoiceUrl, {})
      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
          RNFetchBlob.ios.previewDocument(configfb.path);
        }
        if (Platform.OS === 'android') {
          console.log('file downloaded');
          setIsFileDownloaded(true);
          updateJobStatus(profileData.id);
        }
      })
      .catch(e => {
        console.log('invoice Download==>', e);
      });
  };

  const getPermission = async () => {
    if (isProfileCompleted) {
      if (Platform.OS === 'ios') {
        actualDownload();
      } else {
        try {
          const granted =
            Platform.Version >= '33' // Android 13+ no need for storage permission if using download manager
              ? PermissionsAndroid.RESULTS.GRANTED
              : await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                  {
                    title: 'Storage Permission Required',
                    message:
                      'App needs access to your storage to download the file',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                  },
                );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            actualDownload();
          } else {
            console.log('please grant permission');
          }
        } catch (err) {
          console.warn('Permission error:', err);
        }
      }
    } else {
      setProfileCompleteLocal(false);
    }
  };

  console.log('params.jobId:', params.jobId);
  const getApplicantProfile = async (candidateId: number) => {
    setIsLoading(true);
    try {
      const res = await viewApplicants(candidateId, {
        job_id: params.jobId,
      });
      if (res.success) {
        const profile = res.data.data;
        setIsLoading(false);
        console.log('res of get candidate profile:', profile);
        setProfileData(profile);
      } else {
        console.warn('Error in view candidate profile:', res.err);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('Error in view ', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApplicantProfile(params.candidateId);
  }, []);

  const makePhoneCall = async (phoneNumber: string) => {
    console.log('phoneNumber:', phoneNumber);
    try {
      let phoneUrl;

      if (Platform.OS === 'android') {
        phoneUrl = `tel:${phoneNumber}`;
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
          {
            title: 'Phone Call Permission',
            message: 'This app needs access to make phone calls',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission denied',
            'Cannot make phone calls without permission',
          );
          return;
        }
      } else {
        phoneUrl = `telprompt:${phoneNumber}`;
      }

      const supported = await Linking.canOpenURL(phoneUrl);

      if (!supported) {
        Alert.alert('Error', 'Phone calls are not supported on this device');
      } else {
        await Linking.openURL(phoneUrl);
      }
    } catch (error) {
      console.error('An error occurred', error);
      Alert.alert('Error', 'Unable to make phone call');
    }
  };

  console.log('params.jobId:', params.jobId);

  const RatingStars = ({rating}: {rating: number}) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const stars: JSX.Element[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Image key={`full-${i}`} source={starYellow} style={styles.star} />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Image key={`half`} source={starYellowHalf} style={styles.star} />,
      );
    }

    return <View style={styles.stars_container}>{stars}</View>;
  };

  const handleCall = () => {
    if (isProfileCompleted) {
      makePhoneCall(`${profileData.phone}`);
    } else {
      setProfileCompleteLocal(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(setIsReportJobOpen(false));
    }, []),
  );

  // OPEN REPORT POPUP
  const handleReportOpen = () => {
    if (!isProfileCompleted) {
      setProfileCompleteLocal(false);
    } else {
      dispatch(setIsReportJobOpen(true));
    }
  };

  // UPDATING THE JOB STATUS LIKE "DOWNLOAD RESUME"
  const updateJobStatus = async (candidateId: number) => {
    try {
      const res = await updattingJobStatus(candidateId, {
        job_id: params.jobId,
        status: 'Resume Downloaded',
      });
      if (res.success) {
        console.log('Res of update job status:', res.data);
      } else {
        console.error('Error in update job status:', res.err);
      }
    } catch (err: any) {
      console.error('Error in update job status:', err);
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
            <Text style={GLOBALSTYLE.authTitle_small}>Profile</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={handleReportOpen}>
              <Image style={GLOBALSTYLE.share_img} source={reportFlag} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mg_bottom}>
              <View style={GLOBALSTYLE.mg_top_s}>
                <Image
                  source={
                    profileData.profile
                      ? {uri: profileData.profile}
                      : placeholderBig
                  }
                  style={GLOBALSTYLE.profile_big}
                />

                <Text
                  style={[
                    GLOBALSTYLE.medium_title,
                    GLOBALSTYLE.mg_top_xxs,
                    GLOBALSTYLE.text_center,
                  ]}>
                  {profileData.name}
                </Text>

                <Text
                  style={[GLOBALSTYLE.subTitleActive, GLOBALSTYLE.text_center]}>
                  {profileData.profession
                    ? profileData.profession
                    : 'Dentis (S)'}
                </Text>
                <View
                  style={[
                    GLOBALSTYLE.row,
                    GLOBALSTYLE.gap_xs,
                    GLOBALSTYLE.center,
                  ]}>
                  <RatingStars rating={formatRating(profileData?.rating)} />
                  {profileData.review_count > 0 && (
                    <Text
                      style={[
                        GLOBALSTYLE.subTitleActive,
                        GLOBALSTYLE.text_center,
                      ]}
                      onPress={handleRating}>
                      {formatRating(profileData?.rating)}&nbsp;
                      {`(${
                        profileData?.review_count <= 1
                          ? `${profileData?.review_count} Review`
                          : `${profileData?.review_count} Reviews`
                      })`}
                    </Text>
                  )}
                </View>
                {profileData?.is_review == 0 &&
                  auth_token &&
                  profileData.is_schedule && (
                    <Text
                      style={[
                        GLOBALSTYLE.subTitleActive,
                        GLOBALSTYLE.text_center,
                      ]}
                      onPress={handleReviewPress}>
                      {profileData.review_count > 0
                        ? 'Add Review'
                        : 'Add First Review'}
                    </Text>
                  )}
                <View
                  style={[
                    GLOBALSTYLE.mg_top_xs,
                    GLOBALSTYLE.btn_container_smallone,
                  ]}>
                  {auth_token && profileData.applied_our_Job && (
                    <Button
                      _TEXT="Download Resume"
                      _ONPRESS={getPermission}
                      _BTNSTYLE={GLOBALSTYLE.btn_container}
                      _TEXT_STYLE={GLOBALSTYLE.small_button}
                    />
                  )}
                </View>
              </View>
              <View style={GLOBALSTYLE.mg_top_s}>
                <View
                  style={[
                    GLOBALSTYLE.flex,
                    GLOBALSTYLE.gap_s,
                    styles.flex_wrap,
                  ]}>
                  <View style={styles.box}>
                    <Image source={experienceProfile} style={styles.box_img} />
                    <Text
                      style={[
                        GLOBALSTYLE.medium_title,
                        GLOBALSTYLE.text_center,
                      ]}>
                      {profileData.year_of_experiance}
                    </Text>
                    <Text
                      style={[GLOBALSTYLE.subTitle, GLOBALSTYLE.text_center]}>
                      Experience
                    </Text>
                  </View>
                  <View style={styles.box}>
                    <Image source={patientProfile} style={styles.box_img} />
                    <Text
                      style={[
                        GLOBALSTYLE.medium_title,
                        GLOBALSTYLE.text_center,
                      ]}>
                      {profileData.type_of_experiance === 'both'
                        ? 'Public & Private'
                        : profileData.type_of_experiance}
                    </Text>
                    <Text
                      style={[GLOBALSTYLE.subTitle, GLOBALSTYLE.text_center]}>
                      Types of Exp.
                    </Text>
                  </View>
                  <View style={styles.box}>
                    <Image source={successRate} style={styles.box_img} />
                    <Text
                      style={[
                        GLOBALSTYLE.medium_title,
                        GLOBALSTYLE.text_center,
                      ]}>
                      NA
                    </Text>
                    <Text
                      style={[GLOBALSTYLE.subTitle, GLOBALSTYLE.text_center]}>
                      Success Rate
                    </Text>
                  </View>
                </View>
              </View>
              {/* QUALIFICATION & CERTIFICATION */}
              <View style={[GLOBALSTYLE.mg_top_s, GLOBALSTYLE.gap_s]}>
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.mg_bottom_xxs]}>
                  Qualification & Certification
                </Text>
                {profileData?.qualification?.length > 0 ? (
                  profileData?.qualification?.map(item => {
                    return (
                      <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
                        <Image
                          source={ellipsFilled}
                          style={styles.ellips_small}
                        />
                        <Text style={GLOBALSTYLE.small_title}>{item}</Text>
                      </View>
                    );
                  })
                ) : (
                  <Text style={GLOBALSTYLE.small_title}>No Data Available</Text>
                )}
              </View>
              {/* SOFTWARE EXPERT */}
              <View style={[GLOBALSTYLE.mg_top_s, GLOBALSTYLE.gap_s]}>
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.mg_bottom_xxs]}>
                  Software Expert
                </Text>
                {profileData?.software_experiance?.length > 0 ? (
                  <View
                    style={[
                      GLOBALSTYLE.row,
                      GLOBALSTYLE.gap_s,
                      styles.box_container,
                    ]}>
                    {profileData?.software_experiance?.map(item => {
                      return (
                        <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
                          <View style={styles.grey_box}>
                            <Text style={GLOBALSTYLE.small_title}>{item}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <Text style={GLOBALSTYLE.small_title}>No Data Available</Text>
                )}
              </View>
              {/* LANGUKAGE SPOKEN */}
              <View style={[GLOBALSTYLE.mg_top_s, GLOBALSTYLE.gap_xs]}>
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.mg_bottom_xxs]}>
                  Languages Spoken
                </Text>

                {profileData?.language?.length > 0 ? (
                  <View
                    style={[
                      GLOBALSTYLE.row,
                      GLOBALSTYLE.gap_s,
                      styles.box_container,
                    ]}>
                    {profileData?.language?.map(item => {
                      return (
                        <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
                          <View style={[[GLOBALSTYLE.row, GLOBALSTYLE.gap_xs]]}>
                            <Image source={right} style={styles.right_small} />
                            <Text style={GLOBALSTYLE.small_title}>{item}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <Text style={GLOBALSTYLE.small_title}>No Data Available</Text>
                )}
              </View>
              {/* PREFFERED WORK LOCATION */}
              <View style={[GLOBALSTYLE.mg_top_s, GLOBALSTYLE.gap_s]}>
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.mg_bottom_xxs]}>
                  Preffered Work Location
                </Text>
                {profileData.location ? (
                  <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_xs]}>
                    <Image
                      source={locationBlue}
                      style={styles.location_small}
                    />
                    <Text style={GLOBALSTYLE.small_title}>
                      {profileData.location}
                    </Text>
                  </View>
                ) : (
                  <Text style={GLOBALSTYLE.small_title}>No Data Available</Text>
                )}
              </View>
              {/* HOURLY RATE */}
              <View style={GLOBALSTYLE.mg_top_s}>
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.mg_bottom_xxs]}>
                  Hourly Rate
                </Text>
                {profileData.hourly_rate ? (
                  <Text style={GLOBALSTYLE.small_title}>
                    {/* $ {profileData.hourly_rate}/- */}
                    {profileData.hourly_rate === 'Flexible on Pay'
                      ? profileData.hourly_rate
                      : profileData.hourly_rate + '/-'}
                  </Text>
                ) : (
                  <Text style={GLOBALSTYLE.small_title}>No Data Available</Text>
                )}
              </View>

              <View style={{marginTop: 20}}>
                <Text
                  style={{fontSize: 18, fontWeight: '600', marginBottom: 10}}>
                  Availability Calendar
                </Text>

                {Object.entries(profileData.candidate_availibity || {})
                  // ✅ Only show days with slots
                  .filter(
                    ([_, slots]) => Array.isArray(slots) && slots.length > 0,
                  )
                  .map(([day, slots]) => (
                    <View key={day} style={{marginBottom: 12}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '500',
                          marginBottom: 6,
                        }}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </Text>

                      {slots.map((slot: any, idx: number) => (
                        <View key={idx} style={styles.time_box}>
                          <Text style={[GLOBALSTYLE.small_title]}>
                            From:{' '}
                            <Text style={GLOBALSTYLE.small_title_active}>
                              {slot.from}
                            </Text>
                          </Text>
                          <Text style={GLOBALSTYLE.small_title}>
                            To:{' '}
                            <Text style={GLOBALSTYLE.small_title_active}>
                              {slot.to}
                            </Text>
                          </Text>
                        </View>
                      ))}
                    </View>
                  ))}
              </View>

              {/* SHORT NOTICE */}
              {profileData.short_notice && (
                <View style={GLOBALSTYLE.mg_top_s}>
                  <View style={styles.boolean_box}>
                    <Text
                      style={[GLOBALSTYLE.small_title, styles.left_text_width]}>
                      Willing to Work on Short Notice?
                    </Text>
                    <Text style={GLOBALSTYLE.small_title_active}>
                      {profileData.short_notice}
                    </Text>
                  </View>
                </View>
              )}

              {/* PERMANENT OPPORTUNITIES */}
              {profileData.permanent_opportunities && (
                <View style={GLOBALSTYLE.mg_top_xs}>
                  <View style={styles.boolean_box}>
                    <Text
                      style={[GLOBALSTYLE.small_title, styles.left_text_width]}>
                      Open to Permanent Opportunities?
                    </Text>
                    <Text style={GLOBALSTYLE.small_title_active}>
                      {profileData.permanent_opportunities}
                    </Text>
                  </View>
                </View>
              )}

              {/* Compliance & Vaccination Status */}
              <View style={[GLOBALSTYLE.mg_top_s, GLOBALSTYLE.gap_s]}>
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.mg_bottom_xxs]}>
                  Compliance & Vaccination Status
                </Text>
                {profileData?.vaccination?.length > 0 ? (
                  profileData?.vaccination?.map(item => {
                    return (
                      <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
                        <Image
                          source={ellipsFilled}
                          style={styles.ellips_small}
                        />
                        <Text style={GLOBALSTYLE.small_title}>{item}</Text>
                      </View>
                    );
                  })
                ) : (
                  <Text style={GLOBALSTYLE.small_title}>No Data Available</Text>
                )}
              </View>

              {/* CHILDEREN'S CHECK */}
              {profileData.childrens_check && (
                <View style={GLOBALSTYLE.mg_top_xs}>
                  <View style={styles.boolean_box}>
                    <Text
                      style={[GLOBALSTYLE.small_title, styles.left_text_width]}>
                      Do I have a current Working with Children's Check?
                    </Text>
                    <Text style={GLOBALSTYLE.small_title_active}>
                      {profileData.childrens_check}
                    </Text>
                  </View>
                </View>
              )}

              {/* POLICE CHECK */}
              {profileData.valid_police_check && (
                <View style={GLOBALSTYLE.mg_top_xs}>
                  <View style={styles.boolean_box}>
                    <Text
                      style={[GLOBALSTYLE.small_title, styles.left_text_width]}>
                      Do I have a valid Police Check?
                    </Text>
                    <Text style={GLOBALSTYLE.small_title_active}>
                      {profileData.valid_police_check}
                    </Text>
                  </View>
                </View>
              )}

              {/* POLICE CHECK */}
              {profileData.first_aid_certicate && (
                <View style={GLOBALSTYLE.mg_top_xs}>
                  <View style={styles.boolean_box}>
                    <Text
                      style={[GLOBALSTYLE.small_title, styles.left_text_width]}>
                      Do I have a current first aid certificate?
                    </Text>
                    <Text style={GLOBALSTYLE.small_title_active}>
                      {profileData.first_aid_certicate}
                    </Text>
                  </View>
                </View>
              )}

              {/* Personality & Additional Information */}
              <View style={[GLOBALSTYLE.mg_top_s, GLOBALSTYLE.gap_s]}>
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.mg_bottom_xxs]}>
                  Personality & Additional Information
                </Text>
                {profileData.working_in_dentistry ? (
                  <View
                    style={[
                      GLOBALSTYLE.row,
                      GLOBALSTYLE.gap_s,
                      styles.box_container,
                    ]}>
                    <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
                      <View style={styles.grey_box}>
                        <Text style={GLOBALSTYLE.small_title}>
                          {profileData.working_in_dentistry}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <Text style={GLOBALSTYLE.small_title}>No Data Available</Text>
                )}
              </View>
              {/* PREFFERED WORK ENVIRONMENT */}
              <View style={[GLOBALSTYLE.mg_top_s, GLOBALSTYLE.gap_s]}>
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.mg_bottom_xxs]}>
                  Preffered Work Environment
                </Text>
                {environmentLabels?.length > 0 ? (
                  environmentLabels?.map(item => {
                    return (
                      <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
                        <Image
                          source={ellipsFilled}
                          style={styles.ellips_small}
                        />
                        <Text style={GLOBALSTYLE.small_title}>{item}</Text>
                      </View>
                    );
                  })
                ) : (
                  <Text style={GLOBALSTYLE.small_title}>No Data Available</Text>
                )}
              </View>
              <View style={[GLOBALSTYLE.mg_top_s, GLOBALSTYLE.gap_xs]}>
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.mg_bottom_xxs]}>
                  Fun Fact About Me
                </Text>
                {profileData.fun_fact ? (
                  <View
                    style={[
                      GLOBALSTYLE.row,
                      GLOBALSTYLE.gap_s,
                      styles.box_container,
                    ]}>
                    <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
                      <View style={styles.grey_box}>
                        <Text style={GLOBALSTYLE.small_title}>
                          {profileData.fun_fact}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <Text style={GLOBALSTYLE.small_title}>No Data Available</Text>
                )}
              </View>

              {auth_token && (
                <View style={GLOBALSTYLE.mg_top_s}>
                  {profileData.applied_our_Job && (
                    <View style={GLOBALSTYLE.mg_top_s}>
                      <Button
                        _TEXT={
                          profileData.is_schedule
                            ? 'Reschedule Interview'
                            : 'Schedule Interview'
                        }
                        _ONPRESS={handleInterviewPress}
                        _BTNSTYLE={GLOBALSTYLE.btn_container}
                        _TEXT_STYLE={GLOBALSTYLE.button}
                      />
                    </View>
                  )}
                  <TouchableOpacity
                    style={GLOBALSTYLE.mg_top_xs}
                    activeOpacity={0.8}>
                    <TransparentButton
                      _IMG={call}
                      _TEXT={`Call Now`}
                      _HANDLEPRESS={handleCall}
                    />
                  </TouchableOpacity>
                  <View style={GLOBALSTYLE.mg_top_xs}>
                    <TransparentButton
                      _IMG={chat}
                      _TEXT="Start Chat"
                      _HANDLEPRESS={handleChatBtn}
                    />
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>

      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}

      <RBSheet
        ref={refRBSheet}
        // closeOnDragDown={true}
        closeOnPressMask={true}
        draggable={true}
        dragOnContent={true}
        closeOnPressBack={true}
        height={Platform.OS == 'ios' ? RH(79) : RH(77)}
        // dragFromTopOnly={true}
        // animationType="slide"
        customStyles={{
          container: {
            borderTopLeftRadius: RH(6),
            borderTopRightRadius: RH(6),
            padding: 20,
            overflow: 'visible',
          },
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.7)',
          },
          draggableIcon: {
            backgroundColor: Theme.COLORS.BLACK,
            width: RH(5),
            height: RH(0.6),
            marginTop: RH(-0.5),
          },
        }}>
        <BottomSheet
          candidateId={profileData.id}
          paramsToPass={paramsToPass}
          refRBSheet={refRBSheet}
        />
      </RBSheet>
      {isFileDownloaded && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="File Downloaded"
          _TEXT2="Resume has been downloaded"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}

      {!profileCompleteLocal && (
        <ToastPopup
          _TYPE="error"
          _TEXT1="Complete Profile"
          _TEXT2="Please Complete Profile First"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text2_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}

      {!isScheduleLocal && (
        <ToastPopup
          _TYPE="error"
          _TEXT1="Complete Interview"
          _TEXT2="Please Complete Interview First"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text2_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}

      {isReportSuccess && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Reported Sucessfully"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text2_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}

      {isReportJobOpen && <ReportPopup candidateId={profileData.id} />}
    </>
  );
};

export default CandidateProfile;
