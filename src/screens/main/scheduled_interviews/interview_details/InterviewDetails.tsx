import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './StyleInterviewDetails';
import GLOBALSTYLE from '../../../../theme/GlobalStyle';
import {
  RouteProp,
  SafeAreaView,
  useNavigation,
} from '../../../../components/store/ExternalLibrary';
import {
  backMain,
  calendarSmallBlue,
  clockSmallBlue,
  editImg,
  emailSmallBlue,
  experienceSmallBlue,
  eyeOpen,
  eyeSmallBlue,
  gapSmallBlue,
  locationSmallBlue,
  roleSmallBlue,
  statusSmallBlue,
  userSmallBlue,
} from '../../../../components/store/ImageStore';
import {NativeStackNavigationProp} from '../../../../components/store/ExternalLibrary';
import {MainStackIF} from '../../../../types/MainStackTypes';
import {
  Button,
  ShortDetails,
  ToastPopup,
  TransparentButton,
} from '../../../../components/store/ComponentStore';
import {
  gettingScheduleInterview,
  markingAsComplete,
} from '../../../../api/ApiServices';
import {InterviewJobDetails} from '../../../../types/DataTypes';
import Theme from '../../../../theme/Theme';
type routeProp = RouteProp<MainStackIF, 'INTERVIEW_DETAILS'>;
const InterviewDetails = ({route}: {route: routeProp}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const params = route.params;
  const onGoBack = params.onGoBack;
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const handleBack = () => {
    navigation.goBack();
  };

  const initialInterviewDetails: InterviewJobDetails = {
    Experience: '',
    candidate: '',
    candidate_email: '',
    candidate_id: 0,
    candidate_profession: '',
    created_at: '',
    date: '',
    end_time: '',
    id: 0,
    job_description: '',
    job_id: params.id,
    job_name: '',
    link: '',
    location: '',
    notes: '',
    time: '',
    title: '',
    type: '',
  };

  const [interviewDetails, setInterviewDetails] = useState<InterviewJobDetails>(
    initialInterviewDetails,
  );

  const [status, setStatus] = useState('');
  const [statusToDisplay, setStatusToDisplay] = useState('');

  const handleJoinInterview = () => {
    Linking.openURL(interviewDetails.link);
  };

  // HITTING MARK AS COMPLETE API
  const markAsCompleteInterview = async (interviewId: number) => {
    setIsBtnLoading(true);

    try {
      // dispatch(setIsLoading(true));
      const res = await markingAsComplete(interviewId);
      if (res.success) {
        setStatus('Completed');
        setStatusToDisplay('Completed');
        console.log('res of mark as complete:', res.data);
        // dispatch(setIsLoading(false));
        // setIsSuccess(true);
        setIsBtnLoading(false);
        if (onGoBack) onGoBack();
      } else {
        console.warn('Error in mark as complete:', res.err);
        // dispatch(setIsLoading(false));
        setIsBtnLoading(false);
      }
    } catch (err: any) {
      console.error('Error in mark as complete in else:', err);
      // dispatch(setIsLoading(false));
      setIsBtnLoading(false);
    }
  };

  //   FORMATTING THE API DATE
  const formatDate = (dateString: string): string => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const [year, month, day] = dateString?.split('-');
    const monthName = months[parseInt(month, 10) - 1];

    return `${parseInt(day)} ${monthName} ${year}`;
  };

  // FORMATTING THE API TIME
  function formatTimeTo12Hour(time: string): string {
    const [hourStr, minuteStr] = time?.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    if (hour === 0) hour = 12;

    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;

    return `${formattedHour}:${formattedMinute} ${ampm}`;
  }
  // GETTING SCHEDULE INTERVIEW FOR EDIT THE INTERVIEW
  const getScheduleInterview = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await gettingScheduleInterview(id);
      if (res.success) {
        const data = res.data.data;
        setIsLoading(false);
        console.log('res of get interview details:', data);
        setInterviewDetails(data);
        setStatusToDisplay(data.type);
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
    getScheduleInterview(params.id);
  }, []);

  // MARKING AS COMPLETE THE INTERVIEW
  const handleMarkAsComplete = () => {
    markAsCompleteInterview(params.id);
  };

  // CALCULATING THE TIME DIFFERENCE (DURATION) BETWEEN START AND END_TIME
  function getInterviewDuration(startTime: string, endTime: string): string {
    const [startHour, startMinute] = startTime?.split(':').map(Number);
    const [endHour, endMinute] = endTime?.split(':').map(Number);

    const start = new Date();
    start.setHours(startHour, startMinute, 0);

    const end = new Date();
    end.setHours(endHour, endMinute, 0);

    const diffMs = end.getTime() - start.getTime();
    if (diffMs <= 0) return 'Invalid Time';

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let duration = '';
    if (hours > 0) duration += `${hours} Hour${hours > 1 ? 's' : ''}`;
    if (minutes > 0)
      duration += `${hours > 0 ? ' and ' : ''}${minutes} Min${
        minutes > 1 ? 's' : ''
      }`;

    return duration || '0 Minutes';
  }

  // REDIRECTING TO THE EDIT INTERVIEW SCREEN
  const hanldeEditInterview = () => {
    navigation.navigate('SCHEDULE_INTERVIEW', {
      id: params.id,
      candidateId: interviewDetails.candidate_id,
      jobId: Number(initialInterviewDetails.job_id),
    });
  };

  // REDIRECTING TO THE JOB DETAILS
  const handleJobDetails = () => {
    navigation.navigate('JOB_DETAILS', {jobId: interviewDetails.job_id});
  };

  // REDIRECTING TO THE CANDIDATE DETAILS

  const handleCandidateDetails = () => {
    navigation.navigate('CANDIDATE_PROFILE', {
      candidateId: interviewDetails.candidate_id,
      jobId: interviewDetails.job_id,
    });
  };
  return (
    <>
      {isLoading ? (
        <View style={styles.activity_indicator_container_half}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      ) : (
        <View style={[GLOBALSTYLE.container]}>
          <SafeAreaView>
            <View style={[GLOBALSTYLE.flex]}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleBack}
                hitSlop={30}>
                <Image source={backMain} style={GLOBALSTYLE.back_btn} />
              </TouchableOpacity>
              <Text style={GLOBALSTYLE.authTitle_small}>Interview Details</Text>
              {interviewDetails.type !== 'Completed' &&
              status !== 'Completed' ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={hanldeEditInterview}>
                  <Image style={styles.edit_img} source={editImg} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={0.7}>
                  <Image style={styles.edit_img} />
                </TouchableOpacity>
              )}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.main_container}>
                {/* CANDIDATE INFORMATION */}
                <View style={styles.details_container}>
                  <Text
                    style={[
                      GLOBALSTYLE.medium_title,
                      GLOBALSTYLE.mg_bottom_xs,
                    ]}>
                    Candidate Information
                  </Text>
                  <View style={styles.detail_box}>
                    <View style={[GLOBALSTYLE.gap_ss]}>
                      {/* NAME */}
                      <ShortDetails
                        _ICON={userSmallBlue}
                        _LABEL={'Name'}
                        _VALUE={interviewDetails.candidate}
                      />

                      {/* EMAIL */}
                      <ShortDetails
                        _ICON={emailSmallBlue}
                        _LABEL="Email"
                        _VALUE={interviewDetails.candidate_email}
                      />

                      {/* CURRENT ROLE */}
                      <ShortDetails
                        _ICON={roleSmallBlue}
                        _LABEL="Current Role"
                        _VALUE={interviewDetails.candidate_profession}
                      />

                      {/* LOCATION */}
                      <ShortDetails
                        _ICON={locationSmallBlue}
                        _LABEL="Location"
                        _VALUE={interviewDetails.location}
                      />

                      {/* Experienc */}
                      <ShortDetails
                        _ICON={experienceSmallBlue}
                        _LABEL="Experience"
                        _VALUE={interviewDetails.Experience}
                      />
                      <Button
                        _TEXT="More Details"
                        _ONPRESS={handleCandidateDetails}
                        _BTNSTYLE={GLOBALSTYLE.btn_container}
                        _TEXT_STYLE={GLOBALSTYLE.button}
                      />
                    </View>
                  </View>
                </View>

                {/* INTERVIEW INFORMATION */}
                <View style={styles.details_container}>
                  <Text
                    style={[
                      GLOBALSTYLE.medium_title,
                      GLOBALSTYLE.mg_bottom_xs,
                    ]}>
                    Interview Information
                  </Text>
                  <View style={styles.detail_box}>
                    <View style={[GLOBALSTYLE.gap_ss]}>
                      {/* DATE */}
                      <ShortDetails
                        _ICON={calendarSmallBlue}
                        _LABEL="Interview Date"
                        _VALUE={formatDate(interviewDetails.date)}
                      />

                      {/* START TIME */}
                      <ShortDetails
                        _ICON={clockSmallBlue}
                        _LABEL="Start Time"
                        _VALUE={formatTimeTo12Hour(interviewDetails.time)}
                      />
                      {/* END TIME */}
                      <ShortDetails
                        _ICON={clockSmallBlue}
                        _LABEL="End Time"
                        _VALUE={formatTimeTo12Hour(interviewDetails.end_time)}
                      />
                      {/* DURATION */}
                      <ShortDetails
                        _ICON={gapSmallBlue}
                        _LABEL="Interview Duration"
                        _VALUE={getInterviewDuration(
                          interviewDetails.time,
                          interviewDetails.end_time,
                        )}
                      />
                      {/* STATUS */}
                      <ShortDetails
                        _ICON={statusSmallBlue}
                        _LABEL="Status"
                        _VALUE={statusToDisplay}
                        _STATUS={interviewDetails.type}
                      />
                    </View>
                  </View>
                </View>

                {/* JOB INFORMATION */}
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.mg_bottom_xs]}>
                  Job Information
                </Text>
                <View style={styles.detail_box}>
                  <Text
                    style={[
                      GLOBALSTYLE.medium_title,
                      GLOBALSTYLE.mg_bottom_xs,
                    ]}>
                    Title
                  </Text>
                  <Pressable onPress={handleJobDetails} hitSlop={20}>
                    <Text style={GLOBALSTYLE.small_text}>
                      {interviewDetails.job_name}
                    </Text>
                  </Pressable>
                  <Text
                    style={[
                      GLOBALSTYLE.medium_title,
                      GLOBALSTYLE.mg_top_xs,
                      GLOBALSTYLE.mg_bottom_xs,
                    ]}>
                    Description
                  </Text>
                  <Text style={GLOBALSTYLE.small_text}>
                    {interviewDetails.job_description}
                  </Text>

                  <View style={GLOBALSTYLE.mg_top_xs}>
                    <Button
                      _TEXT="More Details"
                      _ONPRESS={handleJobDetails}
                      _BTNSTYLE={GLOBALSTYLE.btn_container}
                      _TEXT_STYLE={GLOBALSTYLE.button}
                    />
                  </View>
                </View>

                <View
                  style={[
                    GLOBALSTYLE.mg_top_xs,
                    GLOBALSTYLE.mg_bottom_xs,
                  ]}></View>
                {interviewDetails.type !== 'Completed' && (
                  <>
                    {interviewDetails.type !== 'Expired' && (
                      <View
                        style={[
                          GLOBALSTYLE.mg_top_xs,
                          GLOBALSTYLE.mg_bottom_xs,
                        ]}>
                        <Button
                          _TEXT="Join Interview"
                          _ONPRESS={handleJoinInterview}
                          _BTNSTYLE={GLOBALSTYLE.btn_container}
                          _TEXT_STYLE={GLOBALSTYLE.button}
                        />
                      </View>
                    )}
                    {interviewDetails.type === 'Expired' &&
                      status !== 'Completed' && (
                        <View
                          style={
                            (GLOBALSTYLE.mg_top_xs, GLOBALSTYLE.mg_bottom_xs)
                          }>
                          <TransparentButton
                            _HANDLEPRESS={handleMarkAsComplete}
                            _TEXT={
                              isBtnLoading ? (
                                <ActivityIndicator
                                  color={Theme.COLORS.DARK_GREEN}
                                  size={'small'}
                                />
                              ) : (
                                'Mark As Complete'
                              )
                            }
                            _BTN_STYLE={[styles.btn_transparent]}
                            _TEXT_STYLE={[styles.btn_text]}
                          />
                        </View>
                      )}
                  </>
                )}
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      )}

      {status == 'Completed' && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Interview Completed Successfully"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
    </>
  );
};

export default InterviewDetails;
