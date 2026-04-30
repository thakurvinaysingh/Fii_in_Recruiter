import {
  ActivityIndicator,
  Image,
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
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  backMain,
  calendarBlue,
  detailInterview,
  placeholderBig,
  starYellow,
  starYellowHalf,
  timeBlue,
  timeInterview,
} from '../../../components/store/ImageStore';
import styles from './StyleScheduleInterview';
import {
  DateTimePicker,
  NativeStackNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
  useSelector,
  useDispatch,
} from '../../../components/store/ExternalLibrary';
import {MainStackIF} from '../../../types/MainStackTypes';
import {
  Button,
  Input,
  ToastPopup,
} from '../../../components/store/ComponentStore';
import {
  gettingScheduleInterview,
  schedulingInterview,
  viewApplicants,
} from '../../../api/ApiServices';
import {RootState} from '../../../redux/store/Store';
import {setIsInterviewScheduled} from '../../../redux/slices/CommonSlice';
import {CandidateFormData, InterviewListIF} from '../../../types/DataTypes';
import {URL_REGEX} from '../../../constants/Data';
type ScheduleInterviewRouteProp = RouteProp<MainStackIF, 'SCHEDULE_INTERVIEW'>;
const ScheduleInterview = () => {
  const route = useRoute<ScheduleInterviewRouteProp>();
  const params = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const [scheduleInterviewData, setScheduleInterviewData] =
    useState<InterviewListIF>({
      id: 0,
      candidate_id: 0,
      job_id: 0,
      job_name: '',
      candidate: '',
      clinic: '',
      date: '',
      time: '',
      link: '',
      notes: '',
      type: '',
      candidate_profession: '',
      title: '',
      profile: '',
    });

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [tempDate, setTempDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date());
  const [tempEndTime, setTempEndTime] = useState(new Date());
  const [meetingLinkInput, setMeetingLinkInput] = useState('');
  const [titleInput, setTitleInput] = useState(scheduleInterviewData.title);
  const [additionalNotesInput, setAdditionalNotesInput] = useState(
    scheduleInterviewData.notes,
  );
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isEndTimePickerOpen, setIsEndTimePickerOpen] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [isEndTimeSelected, setIsEndTimeSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  });

  // CLEANING UP THE VALUES IF THERE IS NO PARAMS.ID AVAIALABLE

  const [err, setErr] = useState({
    dateError: '',
    timeError: '',
    meetintLinkError: '',
    additionalNotesError: '',
    meetingLinkInvalidErro: '',
    endTimeErr: '',
    titleErr: '',
  });
  const isInterviewScheduled = useSelector(
    (state: RootState) => state.commonSlice.isInterviewScheduled,
  );

  // FORMATTING DATE FOR API - FROM 'Tue May 20 2025 16:21:00 GMT+0530' TO  '2025-07-21'
  const date = new Date(selectedDate);
  const formattedDate = date.toISOString().split('T')[0];

  // FORMATTING TIME FOR API - FROM 'Mon May 19 2025 16:20:00 GMT+0530' TO '16:20'
  const time = new Date(selectedTime);
  const formattedLocalTime = time.toTimeString().slice(0, 5);

  // FORMATTING END TIME FOR API - FROM 'Mon May 19 2025 16:20:00 GMT+0530' TO '16:20'
  const endtime = new Date(selectedEndTime);
  const formattedLocalEndTime = endtime.toTimeString().slice(0, 5);
  const scheduleInterviewParams = {
    id: params.id,
    candidate_id: params.candidateId,
    job_id: params.jobId,
    date: formattedDate,
    time: formattedLocalTime,
    link: meetingLinkInput,
    notes: additionalNotesInput,
    end_time: formattedLocalEndTime,
    title: titleInput,
  };

  console.log('scheduleInterviewParams:', scheduleInterviewParams);

  const handleBack = () => {
    navigation.goBack();
  };
  //   GETTING MEETING LINK INPUT
  const onChangeMeetingLink = (val: string) => {

    setMeetingLinkInput(val?.toLocaleLowerCase());
  };

  const onChangeTitle = (val: string) => {
    if (val) {
      setErr(prevState => ({
        ...prevState,
        titleErr: '',
      }));
    } else {
      setErr(prevState => ({
        ...prevState,
        titleErr: '',
      }));
    }
    setTitleInput(val);
  };

  //   GETTING ADDITIONAL NOTES
  const handleChangeNotesInput = (val: string) => {
    setAdditionalNotesInput(val);
  };

  //   HANDLE DATE SELECTION
  const handleDateChange = (event: any, newDate?: Date) => {
    if (!newDate) return;

    if (Platform.OS === 'ios') {
      setTempDate(newDate);
    } else {
      setSelectedDate(newDate);
      setIsDateSelected(true);
    }

    const combined = new Date(newDate);
    combined.setHours(selectedTime.getHours());
    combined.setMinutes(selectedTime.getMinutes());
    combined.setSeconds(0);
    combined.setMilliseconds(0);

    const now = new Date();

    // Allow today's date only if selected time is in the future
    const isSameDay =
      newDate.getFullYear() === now.getFullYear() &&
      newDate.getMonth() === now.getMonth() &&
      newDate.getDate() === now.getDate();

    if (isSameDay && combined < now && !params.id) {
      setErr(prev => ({
        ...prev,
        dateError: '',
        timeError: 'Please select a future time for today*',
      }));
    } else {
      setErr(prev => ({
        ...prev,
        dateError: '',
        timeError: '',
      }));
    }

    if (Platform.OS === 'android') {
      setIsDatePickerOpen(false);
    }
  };

  //   ONPRESS CONFIRM - DATE
  const handleDateConfirm = () => {
    setSelectedDate(tempDate);
    setIsDatePickerOpen(false);
    setIsDateSelected(true);
  };

  //   ONPRESS CANCEL - DATE
  const handleDateCancel = () => {
    setIsDatePickerOpen(false);
  };

  //   FORMATTING SELECTED DATE
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('en-US', {month: 'short'});
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // COMBINING DATE AND TIME FOR VALIDATING SELECTED DATE AND TIME WITH CURRENT TIME
  const now = new Date();
  const selectedDateTime = new Date(selectedDate);
  selectedDateTime.setHours(selectedTime.getHours());
  selectedDateTime.setMinutes(selectedTime.getMinutes());
  selectedDateTime.setSeconds(0);
  selectedDateTime.setMilliseconds(0);
  const validateInterview = () => {
    if (!isDateSelected && !params.id) {
      setErr(prevState => ({
        ...prevState,
        dateError: 'Date is required*',
      }));
      return false;
    }

    if (!isTimeSelected && !params.id) {
      setErr(prevState => ({
        ...prevState,
        timeError: 'Time is required*',
      }));
      return false;
    }
    if (!isEndTimeSelected && !params.id) {
      setErr(prevState => ({
        ...prevState,
        endTimeErr: 'End Time is required*',
      }));
      return false;
    }

    if (!titleInput) {
      setErr(prevState => ({
        ...prevState,
        titleErr: 'Title is required*',
      }));
      return false;
    }
    if (!meetingLinkInput) {
      setErr(prevState => ({
        ...prevState,
        meetintLinkError: 'Meeting Link is required*',
      }));
      return false;
    }
    if (err.meetintLinkError) {
      return false;
    }
    return true;
  };

  //   SHOW/HIDE DATE PICKER
  const handleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  //   NAVIGATING TO SCHEDULED INTERVIEWS
  const handleScheduleMeeting = () => {
    // navigation.navigate('SCHEDULED_INTERVIEWS');
    if (validateInterview()) {
      scheduleInterview();
    }
  };

  //   HANDLE TIME SELECTION
  const handleTimeChange = (event: any, newTime?: Date) => {
    if (!newTime) return;

    // First update the time as before
    if (Platform.OS === 'ios') {
      setTempTime(newTime);
    } else {
      setSelectedTime(newTime);
      setIsTimeSelected(true);
    }

    const now = new Date();

    // Create combined date-time objects for comparison
    const combinedStart = new Date(selectedDate);
    combinedStart.setHours(newTime.getHours());
    combinedStart.setMinutes(newTime.getMinutes());
    combinedStart.setSeconds(0);
    combinedStart.setMilliseconds(0);

    // Create combined end time if it exists
    let combinedEnd = null;
    if (selectedEndTime) {
      combinedEnd = new Date(selectedDate);
      combinedEnd.setHours(selectedEndTime.getHours());
      combinedEnd.setMinutes(selectedEndTime.getMinutes());
      combinedEnd.setSeconds(0);
      combinedEnd.setMilliseconds(0);
    }

    // Check if it's the same day as today
    const isSameDay =
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getDate() === now.getDate();

    // Validate both conditions
    if (isSameDay && combinedStart < now && !params.id) {
      setErr(prev => ({
        ...prev,
        timeError: 'Please select a future time for today*',
      }));
    } else if (
      combinedEnd &&
      combinedEnd.getTime() - combinedStart.getTime() < 10 * 60 * 1000
    ) {
      setErr(prev => ({
        ...prev,
        timeError: 'Start time must be at least 10 minutes before end time',
        endTimeErr: 'End time must be at least 10 minutes after start time',
      }));
    } else {
      setErr(prev => ({
        ...prev,
        timeError: '',
        // Clear end time error only if it's about the 10-minute gap
        endTimeErr:
          prev.endTimeErr ===
          'End time must be at least 10 minutes after start time'
            ? ''
            : prev.endTimeErr,
      }));
    }

    if (Platform.OS === 'android') {
      setIsTimePickerOpen(false);
    }
  };

  // HANDLE END TIME CHANGE

  const handleEndTimeChange = (event: any, newTime?: Date) => {
    if (!newTime) return;

    // First update the time as before
    if (Platform.OS === 'ios') {
      setTempEndTime(newTime);
    } else {
      setSelectedEndTime(newTime);
      setIsEndTimeSelected(true);
    }

    const now = new Date();

    // Create combined date-time objects for comparison
    const combinedEnd = new Date(selectedDate);
    combinedEnd.setHours(newTime.getHours());
    combinedEnd.setMinutes(newTime.getMinutes());
    combinedEnd.setSeconds(0);
    combinedEnd.setMilliseconds(0);

    const combinedStart = new Date(selectedDate);
    combinedStart.setHours(selectedTime.getHours());
    combinedStart.setMinutes(selectedTime.getMinutes());
    combinedStart.setSeconds(0);
    combinedStart.setMilliseconds(0);

    // Check if it's the same day as today
    const isSameDay =
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getDate() === now.getDate();

    // Calculate the difference in minutes
    const timeDifference =
      (combinedEnd.getTime() - combinedStart.getTime()) / (1000 * 60);

    // Validate both conditions
    if (isSameDay && combinedEnd < now && !params.id) {
      setErr(prev => ({
        ...prev,
        endTimeErr: 'End time cannot be in the past',
        // Keep existing start time error if it exists
        timeError: prev.timeError,
      }));
    } else if (timeDifference < 10) {
      setErr(prev => ({
        ...prev,
        endTimeErr: 'End time must be at least 10 minutes after start time',
        timeError: 'Start time must be at least 10 minutes before end time',
      }));
    } else {
      // When validation passes, clear BOTH related errors
      setErr(prev => ({
        ...prev,
        endTimeErr: '',
        // Only clear the start time error if it's about the 10-minute gap
        timeError:
          prev.timeError ===
          'Start time must be at least 10 minutes before end time'
            ? ''
            : prev.timeError,
      }));
    }

    if (Platform.OS === 'android') {
      setIsEndTimePickerOpen(false);
    }
  };
  //   ONPRESS CONFIRM - TIME
  const handleTimeConfirm = () => {
    setSelectedTime(tempTime);
    setIsTimePickerOpen(false);
    setIsTimeSelected(true);
  };

  //   ONPRESS CONFIRM - TIME
  const handleEndTimeConfirm = () => {
    setSelectedEndTime(tempEndTime);
    setIsEndTimePickerOpen(false);
    setIsEndTimeSelected(true);
  };

  //   ONPRESS CANCEL - TIME
  const handleTimeCancel = () => {
    setIsTimePickerOpen(false);
  };

  const handleEndTimeCancel = () => {
    setIsEndTimePickerOpen(false);
  };

  const handleTimePicker = () => {
    setIsTimePickerOpen(!isTimePickerOpen);
  };

  const handleEndTimePicker = () => {
    setIsEndTimePickerOpen(!isEndTimePickerOpen);
  };

  const parseTimeStringToDate = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  };
  //   FORMATTING SELECTED TIME
  function formatTime(time: Date): string {
    const date = new Date(time);

    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();

    const ampm: string = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }
  // GETTING CANDIDATE PROFILE DATA SO TO SHOW FEW THINGS LIKE NAME, PROFILE, RATING ETC.
  const getApplicantProfile = async (candidateId: number) => {
    setIsLoading(true);
    try {
      const res = await viewApplicants(params.candidateId, {
        job_id: params.id ?? 0,
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

  // GETTING SCHEDULE INTERVIEW FOR EDIT THE INTERVIEW
  const getScheduleInterview = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await gettingScheduleInterview(id);
      if (res.success) {
        const scheduleInterview = res.data.data;
        setIsLoading(false);
        console.log('res of get candidate ldkf:', scheduleInterview);
        // setProfileData(profile);
        setScheduleInterviewData(scheduleInterview);
        if (params.id) {
          setMeetingLinkInput(scheduleInterview.link);
          setAdditionalNotesInput(scheduleInterview.notes);
          setTitleInput(scheduleInterview.title);
          const parsedDate = new Date(scheduleInterview.date);
          if (!isNaN(parsedDate.getTime())) {
            setSelectedDate(parsedDate);
            console.log('selected date:', formatDate(parsedDate));
          } else {
            console.warn('Invalid date format:', scheduleInterview.date);
          }

          if (scheduleInterview.time) {
            const parsedTime = parseTimeStringToDate(scheduleInterview.time);
            setSelectedTime(parsedTime);
          }
        }
      } else {
        console.warn('Error in view candidate profileee:', res.err);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('Error in view ', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      getScheduleInterview(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    getApplicantProfile(params.candidateId);
  }, []);

  const scheduleInterview = async () => {
    setIsLoading(true);
    try {
      const res = await schedulingInterview(scheduleInterviewParams);
      if (res.success) {
        console.log('res of schedule interview:', res.data);
        setIsLoading(false);
        dispatch(setIsInterviewScheduled(true));
        navigation.navigate('SCHEDULED_INTERVIEWS');
      } else {
        console.warn('res of schedule interviewww:', res.err);
        setIsLoading(false);
        if (
          res.err === 'The date field must be a date after or equal to today.'
        ) {
          setErr(state => ({
            ...state,
            dateError: 'Date must be today or future*',
          }));
        } else if (res.err == 'The interview time must be in the future.') {
          setErr(state => ({
            ...state,
            timeError: 'Time must be in the future*',
          }));
        } else if (res.err == 'The end time field must be a date after time.') {
          setErr(state => ({
            ...state,
            endTimeErr: 'The end time must be after start time*',
          }));
        }
      }
    } catch (err: any) {
      console.warn('Error in schedule interview:', err);
      setIsLoading(false);
    }
  };

  // CHANGING THE STATE OF POPUP TO SHOW EVERYTIME
  useEffect(() => {
    if (isInterviewScheduled) {
      const timer = setTimeout(() => {
        dispatch(setIsInterviewScheduled(false));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isInterviewScheduled]);

  const formatRating = (rating: number) => {
    return parseFloat(rating.toFixed(1));
  };

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
  return (
    <>
      <View style={GLOBALSTYLE.container}>
        <SafeAreaView>
          <View style={[GLOBALSTYLE.flex, styles.mg_bottom]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
              hitSlop={30}>
              <Image source={backMain} style={GLOBALSTYLE.back_btn} />
            </TouchableOpacity>
            <Text style={GLOBALSTYLE.authTitle_small}>
              {params.id ? 'Update Interview' : 'Schedule Interview'}
            </Text>
            <Image style={GLOBALSTYLE.share_img} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mg_bottom_another}>
              <View style={styles.container_mg_bottom}>
                <View style={[GLOBALSTYLE.mg_top_s, styles.profile_container]}>
                  <View style={GLOBALSTYLE.only_row}>
                    <Image
                      source={
                        profileData.profile
                          ? {uri: profileData.profile}
                          : placeholderBig
                      }
                      style={styles.profile_img}
                    />
                    <View style={GLOBALSTYLE.gap_xs}>
                      <Text style={GLOBALSTYLE.medium_title}>
                        {profileData.name}
                      </Text>
                      <Text style={GLOBALSTYLE.small_text_active}>
                        {profileData.profession}
                      </Text>

                      <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_xs]}>
                        {/* <Image source={starYellow} style={styles.star_yellow} /> */}
                        <RatingStars
                          rating={formatRating(profileData.rating)}
                        />
                        <Text style={GLOBALSTYLE.medium_title}>
                          {formatRating(profileData.rating)}
                        </Text>
                        <View>
                          <Text
                            style={
                              GLOBALSTYLE.subTitle
                            }>{`(${profileData.review_count} Reviews)`}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                {/* SELECT DATE */}
                <View
                  style={[
                    GLOBALSTYLE.row,
                    GLOBALSTYLE.gap_s,
                    GLOBALSTYLE.mg_top_s,
                  ]}>
                  <Image source={timeInterview} style={styles.img} />
                  <Text style={GLOBALSTYLE.medium_title}>Timing</Text>
                </View>
                <View style={GLOBALSTYLE.mg_top_s}>
                  <Text
                    style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                    Date<Text style={GLOBALSTYLE.required}>*</Text>
                  </Text>
                  <TouchableOpacity
                    style={GLOBALSTYLE.dropdown_container}
                    activeOpacity={0.7}
                    onPress={handleDatePicker}>
                    <View style={GLOBALSTYLE.flex}>
                      {!isDateSelected && !params.id ? (
                        <View style={GLOBALSTYLE.row}>
                          <Image
                            source={calendarBlue}
                            style={styles.input_img}
                          />
                          <Text style={GLOBALSTYLE.input_title_grey}>
                            Select Date
                          </Text>
                        </View>
                      ) : (
                        <View style={GLOBALSTYLE.row}>
                          <Image
                            source={calendarBlue}
                            style={styles.input_img}
                          />
                          <Text style={GLOBALSTYLE.input_title}>
                            {formatDate(selectedDate)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  {err.dateError && (
                    <Text style={GLOBALSTYLE.error_text}>{err.dateError}</Text>
                  )}
                </View>

                {/* START TIME */}
                <View style={GLOBALSTYLE.mg_top_s}>
                  <Text
                    style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                    Start Time<Text style={GLOBALSTYLE.required}>*</Text>
                  </Text>
                  <TouchableOpacity
                    style={GLOBALSTYLE.dropdown_container}
                    activeOpacity={0.7}
                    onPress={handleTimePicker}>
                    <View style={GLOBALSTYLE.flex}>
                      {!isTimeSelected && !params.id ? (
                        <View style={GLOBALSTYLE.row}>
                          <Image source={timeBlue} style={styles.input_img} />
                          <Text style={GLOBALSTYLE.input_title_grey}>
                            Select Time
                          </Text>
                        </View>
                      ) : (
                        <View style={GLOBALSTYLE.row}>
                          <Image source={timeBlue} style={styles.input_img} />
                          <Text style={GLOBALSTYLE.input_title}>
                            {formatTime(selectedTime)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  <Text style={GLOBALSTYLE.error_text}>{err.timeError}</Text>
                </View>

                {/* END TIME */}
                <Text
                  style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                  End Time<Text style={GLOBALSTYLE.required}>*</Text>
                </Text>
                <TouchableOpacity
                  style={GLOBALSTYLE.dropdown_container}
                  activeOpacity={0.7}
                  onPress={handleEndTimePicker}>
                  <View style={GLOBALSTYLE.flex}>
                    {!isEndTimeSelected && !params.id ? (
                      <View style={GLOBALSTYLE.row}>
                        <Image source={timeBlue} style={styles.input_img} />
                        <Text style={GLOBALSTYLE.input_title_grey}>
                          Select Time
                        </Text>
                      </View>
                    ) : (
                      <View style={GLOBALSTYLE.row}>
                        <Image source={timeBlue} style={styles.input_img} />
                        <Text style={GLOBALSTYLE.input_title}>
                          {formatTime(selectedEndTime)}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={GLOBALSTYLE.error_text}>{err.endTimeErr}</Text>

                {/* ADDITIONAL DETAILS */}
                <View
                  style={[
                    GLOBALSTYLE.row,
                    GLOBALSTYLE.gap_s,
                    GLOBALSTYLE.mg_top_xs,
                  ]}>
                  <Image source={detailInterview} style={styles.img} />
                  <Text style={GLOBALSTYLE.medium_title}>
                    Additional Details
                  </Text>
                </View>

                {/* TITLE */}
                <View style={GLOBALSTYLE.mg_top_s}>
                  <Input
                    _WIDTH={'100%'}
                    _ONCHANGE={onChangeTitle}
                    _PLACEHOLDER="Enter title"
                    _VALUE={titleInput}
                    _LABEL={
                      <>
                        Title
                        <Text style={GLOBALSTYLE.required}>*</Text>
                      </>
                    }
                  />
                  <Text style={GLOBALSTYLE.error_text}>{err.titleErr}</Text>
                </View>
                {/* MEETING LINK */}
                <View style={GLOBALSTYLE.mg_top_xs}>
                  <Input
                    _WIDTH={'100%'}
                    _ONCHANGE={onChangeMeetingLink}
                    _PLACEHOLDER="https://www.interviewlink.com"
                    _VALUE={meetingLinkInput}
                    _LABEL={
                      <>
                        Meeting Link<Text style={GLOBALSTYLE.required}>*</Text>
                      </>
                    }
                  />
                  <Text style={GLOBALSTYLE.error_text}>
                    {err.meetintLinkError}
                  </Text>
                </View>

                <View style={[GLOBALSTYLE.mg_top_xxs]}>
                  <Text style={[GLOBALSTYLE.input_label]}>
                    Additional Notes
                  </Text>
                  <View style={GLOBALSTYLE.mg_top_xs}>
                    <TextInput
                      value={additionalNotesInput}
                      onChangeText={handleChangeNotesInput}
                      placeholder="Any specific detail?"
                      placeholderTextColor={'grey'}
                      multiline
                      style={styles.input_area}
                    />
                  </View>
                </View>
              </View>

              <Button
                _TEXT={params.id ? 'Update Interview' : 'Schedule Interview'}
                _ONPRESS={handleScheduleMeeting}
                _BTNSTYLE={GLOBALSTYLE.btn_container}
                _TEXT_STYLE={GLOBALSTYLE.button}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* DATE PICKER */}
      {isDatePickerOpen && (
        <View style={styles.date_picker_container}>
          <DateTimePicker
            mode="date"
            minimumDate={new Date()}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            value={selectedDate}
            onChange={handleDateChange}
          />
          <View style={styles.date_picker_box}>
            <Pressable style={styles.cancel_con}>
              <Text style={styles.picker_text} onPress={handleDateCancel}>
                Cancel
              </Text>
            </Pressable>
            <Pressable style={styles.confirm_con}>
              <Text style={styles.picker_text} onPress={handleDateConfirm}>
                Confirm
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* TIME PICKER */}
      {isTimePickerOpen && (
        <View style={styles.date_picker_container}>
          <DateTimePicker
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            value={selectedTime}
            onChange={handleTimeChange}
          />
          <View style={styles.date_picker_box}>
            <Pressable style={styles.cancel_con}>
              <Text style={styles.picker_text} onPress={handleTimeCancel}>
                Cancel
              </Text>
            </Pressable>
            <Pressable style={styles.confirm_con}>
              <Text style={styles.picker_text} onPress={handleTimeConfirm}>
                Confirm
              </Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* END TIME PICKER */}

      {isEndTimePickerOpen && (
        <View style={styles.date_picker_container}>
          <DateTimePicker
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            value={selectedEndTime}
            onChange={handleEndTimeChange}
          />
          <View style={styles.date_picker_box}>
            <Pressable style={styles.cancel_con}>
              <Text style={styles.picker_text} onPress={handleEndTimeCancel}>
                Cancel
              </Text>
            </Pressable>
            <Pressable style={styles.confirm_con}>
              <Text style={styles.picker_text} onPress={handleEndTimeConfirm}>
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

      {isInterviewScheduled && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2={
            params.id
              ? 'Interview Updated Successfully!'
              : 'Interview Scheduled Successfully!'
          }
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
    </>
  );
};

export default ScheduleInterview;
