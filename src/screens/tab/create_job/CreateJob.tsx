import {
  ActivityIndicator,
  Animated,
  BackHandler,
  FlatList,
  Image,
  Keyboard,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import styles from './StyleCreateJob';
import {
  alert,
  arrowRight,
  backMain,
  info,
  success,
} from '../../../components/store/ImageStore';
import {
  NativeStackNavigationProp,
  useNavigation,
  DateTimePicker,
  DocumentPicker,
  useDispatch,
  useFocusEffect,
  GooglePlacesAutocomplete,
  useRoute,
  RouteProp,
  NativeStackScreenProps,
  useSelector,
} from '../../../components/store/ExternalLibrary';
import {MainStackIF} from '../../../types/MainStackTypes';
import {
  Button,
  Dropdown,
  Input,
  Popup,
  Radio,
  RenderBenefits,
  RenderSoftware,
  RenderWorkingHours,
  ToastPopup,
} from '../../../components/store/ComponentStore';
import {
  benifits,
  experienceLevel,
  GOOGLE_API_KEY,
  urgentData,
  workingHours,
} from '../../../constants/Data';
import {
  creatingJob,
  gettingCreateJobData,
  gettingInterviewList,
  gettingOrUpdatingJobDetail,
} from '../../../api/ApiServices';
import {setClininc, setUrgent} from '../../../redux/slices/CommonSlice';
import {BottomTabParamList} from '../../../types/BottomTabParamList';
import {RootState} from '../../../redux/store/Store';
import {
  setLatitude,
  setLocation,
  setLocationError,
  setLongitude,
  setLookingFor,
  setWorkingHours,
} from '../../../redux/slices/ProfileSlice';
interface benefitsIF {
  id: string;
  item: string;
}
const CreateJob = () => {
  const route = useRoute<RouteProp<BottomTabParamList>>();
  const tabNavigation =
    useNavigation<NativeStackNavigationProp<BottomTabParamList>>();
  const mainNavigation =
    useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const [titleInput, setTitleInput] = useState('');
  const [isProfessionPopOpen, setIsProfessionPopOpen] = useState(false);
  const [isExpPopOpen, setIsExpPopOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState({
    key: '',
    value: 0,
  });
  // const [lat, setLat] = useState('');
  // const [long, setLong] = useState('');

  const [selectedProfession, setSelectedProfession] = useState<number>(0);
  const {urgent} = useSelector((state: RootState) => state.commonSlice);

  const [formattedProfession, setFormattedProfession] = useState<number>(0);
  const [selectedSoftware, setSelectedSoftware] = useState<number[]>([]);
  const [selectedWorkingHours, setSelectedWorkingHours] = useState<string[]>(
    [],
  );
  const [selectedExperience, setSelectedExperience] = useState<string>('');
  const [selectedDocs, setSelectedDocs] = useState<
    {key: string; value: string}[]
  >([]);
  // const [location, setLocation] = useState('');
  const [fromSalary, setFromSalary] = useState('');
  const [toSalary, setToSalary] = useState('');
  const [benifitsInput, setBenifitsInput] = useState('');
  const [filteredBenifits, setFilteredBenifits] = useState(benifits || []);
  const [isAllBenifitsVisible, setIsAllBenifitsVisible] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [fileResponse, setFileResponse] = useState([]);
  const [apiNotRespond, setApiNotRespond] = useState(false);
  const [isProfileNotCreated, setIsProfileNotCreated] = useState(false);
  const [vacancy, setVacancy] = useState('');
  const [departmentData, setDepartmentData] = useState([]);
  const [profession, setProfession] = useState([]);
  const [requiredDoc, setRequiredDoc] = useState([]);
  const [software, setSoftware] = useState([]);
  const {location, latitude, longitude, locationError} = useSelector(
    (state: RootState) => state.profileSlice.practiceInformation,
  );

  const {city} = useSelector((state: RootState) => state.profileSlice);

  // VALIDATION ERROR
  const [titleError, setTitleError] = useState('');
  const [professionError, setProfessionError] = useState('');
  const [softwareError, setSoftwareError] = useState('');
  const [workingHoursError, setWorkingHoursError] = useState('');
  const [vacancyError, setVacancyError] = useState('');
  // const [locationError, setLocationError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [experienceError, setExperienceError] = useState('');
  const [salaryError, setSalaryError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isClinicCreated, setIsClinicCreated] = useState(false);
  const [isClinicVerified, setIsClinicVerified] = useState(false);
  const [isClinicBlocked, setIsClinicBlocked] = useState(false);
  const [isJobCreated, setIsJobCreated] = useState(false);
  const [choosenBenefits, setChoosenBenefits] = useState<benefitsIF[]>([]);
  const dispatch = useDispatch();

  // USEREF FOR SCROLL USER TO THE ERROR FILED
  const titleRef = useRef<TextInput>(null);
  const departmentRef = useRef<TextInput>(null);
  const locationRef = useRef<TextInput>(null);
  const employementTypeRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const experienceRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<any>(null);

  const scrollToField = (fieldRef: React.RefObject<TextInput>) => {
    if (fieldRef.current && scrollViewRef.current) {
      fieldRef.current.measureLayout(scrollViewRef.current, (x, y) => {
        scrollViewRef.current?.scrollTo({y, animated: true});
      });
    }
  };

  const hanldeBackToProfile = () => {
    mainNavigation.navigate('PROFILE', {comeFrom: 'create-job'});
  };
  const handleProfessionSelection = (value: number) => {
    setSelectedProfession(value);
    setFormattedProfession(value);
    setProfessionError('');
    setIsProfessionPopOpen(false);
  };

  // SOFTWARE SELECTION
  const handleSoftwareSelection = (value: number) => {
    setSoftwareError('');
    setSelectedSoftware(prevSelected =>
      prevSelected.some(item => item === value)
        ? prevSelected.filter(item => item !== value)
        : [...prevSelected, value],
    );
  };

  // WORKING HOURS SELECTION
  const handleWorkingHoursSelection = (key: string) => {
    setWorkingHoursError('');
    setSelectedWorkingHours(prevSelected =>
      prevSelected.some(item => item === key)
        ? prevSelected.filter(item => item !== key)
        : [...prevSelected, key],
    );
  };

  // FORM VALIDATION
  const formValidation = () => {
    if (!titleInput) {
      setTitleError('Job Title is required*');
      scrollToField(titleRef);
      return false;
    } else if (!selectedProfession) {
      setProfessionError('Profession is required*');
      return false;
    } else if (!location) {
      // setLocationError('Location is required*');
      dispatch(setLocationError('Location is required*'));
      return false;
    } else if (selectedSoftware.length === 0) {
      setSoftwareError('Software is required*');
      return false;
    } else if (!vacancy) {
      setVacancyError('Vacancy is required*');
      return false;
    } else if (!descriptionInput) {
      setDescriptionError('Description is required*');
      return false;
    } else if (!selectedExperience) {
      setExperienceError('Experience Level is required*');
      return false;
    } else if (selectedWorkingHours.length === 0) {
      setWorkingHoursError('Working Hours is required*');
      return false;
    } else {
      return true;
    }
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

  const handleUrgentSelection = (item: string) => {
    dispatch(setUrgent(item));
  };
  const handleDateConfirm = () => {
    setSelectedDate(tempDate);
    setIsDatePickerOpen(false);
  };

  // CENCEL DATE FUNCTION
  const handleDateCancel = () => {
    setIsDatePickerOpen(false);
  };

  // FROM SALARY INPUT
  const onChangeFromSalary = (val: string) => {
    const numericVal = val.replace(/[^0-9]/g, '');

    if (Number(numericVal) > Number(toSalary)) {
      setSalaryError('From salary should be less than To salary');
    } else {
      setSalaryError('');
    }

    setFromSalary(numericVal);
  };

  // TO SALARY INPUT
  const onChangeToSalary = (val: string) => {
    const numericVal = val.replace(/[^0-9]/g, '');

    if (Number(numericVal) < Number(fromSalary)) {
      setSalaryError('From salary should be less than To salary');
    } else {
      setSalaryError('');
    }
    setToSalary(numericVal);
  };

  // JOB TITLE INPUT
  const onChangeTitle = (val: string) => {
    const formattedText = val.replace(/\s{2,}/g, ' ');

    setTitleInput(val);
    if (val === ' ') {
      setTitleInput('');
    } else if (/\s{2,}/.test(val)) {
      setTitleInput(formattedText);
    } else if (
      (val.trim().length > 0 && val.trim().length < 5) ||
      val.trim().length > 50
    ) {
      setTitleError('Job Title must be 5-50 characters long');
    } else {
      setTitleError('');
    }
  };

  const cleanupSates = () => {
    setTitleInput('');
    setSelectedDepartment({key: '', value: 0});
    setLocation('');
    dispatch(setLocation(''));
    setProfession([]);
    setVacancy('');
    setFromSalary('');
    setToSalary('');
    setBenifitsInput('');
    setFilteredBenifits(benifits);
    setDescriptionInput('');
    setSelectedExperience('');
    setSelectedDate(new Date());
    setSelectedDocs([]);
    setSelectedSoftware([]);
    setSelectedWorkingHours([]);
  };

  const handleBack = () => {
    if (route.params?.id) {
      mainNavigation.navigate('ALL_JOBS', {comeFrom: 'create job'});
      mainNavigation.goBack();
    }
    cleanupSates();
    tabNavigation.goBack();
    // mainNavigation.goBack();
  };

  const handlePostedJobs = () => {
    mainNavigation.navigate('ALL_JOBS', {comeFrom: 'popup'});
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (route.params?.id) {
          mainNavigation.navigate('ALL_JOBS', {comeFrom: 'create job'});
        }
        cleanupSates();
        mainNavigation.goBack();
        return true;
      },
    );

    return () => backHandler.remove();
  }, [mainNavigation]);

  // ADDING BENEFITS
  const handleAddBenifits = () => {
    const isDuplicate = filteredBenifits.some(
      item => item.toLowerCase() === benifitsInput.toLowerCase(),
    );

    if (filteredBenifits.length < 4) {
      setIsAllBenifitsVisible(false);
    }
    if (benifitsInput && !isDuplicate) {
      setFilteredBenifits(prevList => [...prevList, benifitsInput]);
      filteredBenifits.map((item: any) => {
        setChoosenBenefits([item.benifit, ...choosenBenefits]);
      });
      setBenifitsInput('');
    }
  };

  // BENEFITS VIEW ALL HANDLE
  const viewAll = () => {
    if (filteredBenifits.length > 4) {
      setIsAllBenifitsVisible(true);
    } else {
      setIsAllBenifitsVisible(false);
    }
  };

  // BENEFITS INPUT
  const onChangeAddBenifitsInput = (val: string) => {
    const formattedText = val.replace(/\s{2,}/g, ' ').trim();
    if (val === ' ') {
      setBenifitsInput('');
    } else if (/\s{2,}/.test(val)) {
      setBenifitsInput(formattedText);
    } else {
      setBenifitsInput(val);
    }
  };

  // VACANY INPUT
  const onChangeVacancy = (val: string) => {
    setVacancy(val);
    if (val) {
      setVacancyError('');
    }
  };

  // HANDLE DESCRIPTION INPUT
  const handleChangeDescription = (val: string) => {
    const formattedText = val.replace(/\s{2,}/g, ' ').trim();
    console.log('val.length:', val.length);
    if (val === ' ') {
      setDescriptionInput('');
    } else if (/\s{2,}/.test(val)) {
      setDescriptionInput(formattedText);
    } else if (val.length < 100 && val.length > 0) {
      setDescriptionError('Description must be 100 characters long');
      setDescriptionInput(val);
      console.log(val.length);
    } else {
      setDescriptionInput(val);
      setDescriptionError('');
    }
  };

  const handleNavigateCreateClinic = () => {
    if (!isClinicCreated) {
      mainNavigation.navigate('PROFILE', {comeFrom: 'alert'});
      setIsPopOpen(false);
    } else if (!isClinicVerified) {
      tabNavigation.navigate('Home');
      setIsPopOpen(false);
    } else {
      mainNavigation.navigate('ABOUT');
    }
  };

  // PICKING UP THE DOCUMENT
  const handleDocumentSelection = useCallback(async () => {
    try {
      const response: any = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  // EXPERIENCE SELECTION
  const handleExperienceSelection = (value: number, key: string) => {
    setSelectedExperience(key);
    setIsExpPopOpen(false);
    setIsDatePickerOpen(false);
    setExperienceError('');
  };
  const handleShowHideProfession = () => {
    setIsProfessionPopOpen(!isProfessionPopOpen);
    setIsExpPopOpen(false);
  };
  // SHOW/HIDE EXPERIENCE
  const handleShowHideExperience = () => {
    setIsProfessionPopOpen(false);
    setIsExpPopOpen(!isExpPopOpen);
  };

  // JOB FORM PARAMS
  const createJobParams = {
    id: route.params?.id,
    title: titleInput,
    address: location,
    profession: selectedProfession,
    salary_range_from: Number(fromSalary),
    salary_range_to: Number(toSalary),
    software: selectedSoftware,
    shift: selectedWorkingHours,
    experiance_level: selectedExperience,
    job_description: descriptionInput,
    benefits: filteredBenifits,
    vacancy: Number(vacancy),
    latitude: latitude,
    longitude: longitude,
    city: city,
    urgent: urgent == 'NO' ? 0 : 1,
  };

  console.log('createJobParams:', createJobParams);

  // CREATING/UPDATING JOBS
  const createJobAPI = async () => {
    setIsLoading(true);
    try {
      const response = await creatingJob(createJobParams);
      if (response.success) {
        console.log('Response of create job:', response.data);
        setIsJobCreated(true);
        setIsLoading(false);
      } else {
        console.warn('Response Faild in create job:', response.err);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.warn('Error in create job:', err);
      setIsLoading(false);
    }
  };

  // CREATE JOB API (FORM VALIDATION === true)
  const handleCreateJob = () => {
    if (
      formValidation() &&
      titleError == '' &&
      professionError == '' &&
      professionError === '' &&
      locationError == '' &&
      descriptionError == '' &&
      experienceError == '' &&
      salaryError === ''
    ) {
      createJobAPI();
      console.log('API worked');
    } else {
      console.log('Validate the form first');
    }
  };

  // VIEWING OR UPDATING THE
  const getOrUpdatingJobDetail = async () => {
    try {
      const res = await gettingOrUpdatingJobDetail(route?.params?.id);
      if (res.success) {
        console.log('res of getting job detail:', res.data.data);
        setTitleInput(res.data.data.title);
        setSelectedDepartment({
          value: res.data.data.specialization_id,
          key: res.data.data.specialization,
        });
        setSelectedProfession(res.data.data.profession);
        dispatch(setLocation(res.data.data.address));
        setVacancy(res.data.data.vacancy.toString());
        setFromSalary(res.data.data.salary_range_from);
        setToSalary(res.data.data.salary_range_to);
        setDescriptionInput(res.data.data.job_description);
        setSelectedExperience(res.data.data.experiance_level);
        setFilteredBenifits(res.data.data.benefits);
        setSelectedDocs(res.data.data.require_document);
        setSelectedSoftware(res.data.data.software);
        setSelectedWorkingHours(res.data.data.shift);
        dispatch(setLatitude(res.data.data.longitude));
        dispatch(setLongitude(res.data.data.longitude));
        console.log(
          'res.data.data.require_document:',
          res.data.data.require_document,
        );

        // setSelectedDate(formatDate(new Date()));
      } else {
        console.log('res of getting job detailss:', res.err);
        // setApiNotRespond(true);
      }
    } catch (err: any) {
      console.log('error in getting job detail:', err);
      // setApiNotRespond(true);
    }
  };

  // HITTING INTERVIEW LIST API TO KNOW ONLY THAT USER PROFILE IS CREATED OR NOT
  const getInterviewList = async () => {
    try {
      const res = await gettingInterviewList();
      if (res.success) {
        console.log('res of getting interview list:', res.data.data);
      } else if (res.err === 'First, you must be complete Your Profile.') {
        console.warn('Error in getting interview list:', res.err);
        setIsProfileNotCreated(true);
      }
    } catch (err: any) {
      console.error('Error while hitting interview list:', err);
    }
  };

  // GETTING THE DROPDOWN DATA
  const gettingDynamicData = async () => {
    setIsLoading(true);
    try {
      const response = await gettingCreateJobData();
      if (response.success) {
        console.log('Response of dynamic data:', response.data.data);
        setIsLoading(false);
        setDepartmentData(response.data.data.department);
        setProfession(response.data.data.profession);
        setRequiredDoc(response.data.data.require_document);
        setSoftware(response.data.data.software);
      } else if (response.err === 'First, you must create a Clinic.') {
        console.warn('Response Faild in dynamic data:', response.err);
        setIsLoading(false);
        setIsPopOpen(true);
        dispatch(setClininc(false));
        setIsClinicCreated(false);
      } else if (
        response.err === 'Your Clinic has not been verified by the Fill-in.'
      ) {
        setIsLoading(false);
        setIsPopOpen(true);
        setIsClinicVerified(false);
        setIsClinicCreated(true);
        console.warn('not verified');
      } else if (
        response.err ===
        'Your Clinic has been blocked by Fill-in. Please contact us for further assistance.'
      ) {
        setIsLoading(false);
        setIsPopOpen(true);
        setIsClinicVerified(true);
        setIsClinicCreated(true);
        setIsClinicBlocked(true);
      } else {
        setIsClinicCreated(true);
        setIsClinicVerified(true);
        setIsLoading(false);
        dispatch(setClininc(true));
        console.warn('response.err:', response.err);
      }
    } catch (err: any) {
      console.warn('Error in dynamic data:', err);
      setIsLoading(false);
    }
  };
  // useFocusEffect(
  //   useCallback(() => {
  //     getOrUpdatingJobDetail();
  //     gettingDynamicData();
  //     getInterviewList();
  //   }, []),
  // );

  useEffect(() => {
    getOrUpdatingJobDetail();
    gettingDynamicData();
    getInterviewList();
  }, []);

  const handlLocationSearch = () => {
    mainNavigation.navigate('SEARCH_LOCATION');
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
            <Text
              style={GLOBALSTYLE.authTitle_small}
              onPress={handleDocumentSelection}>
              {`${route.params?.id ? 'Update' : 'Create'}`} Job
            </Text>
            <Text></Text>
          </View>

          {fileResponse.map((file: any, index) => (
            <Text
              key={index.toString()}
              numberOfLines={1}
              ellipsizeMode={'middle'}>
              {file?.uri}
            </Text>
          ))}

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            <TouchableWithoutFeedback
              onPress={() => {
                setIsExpPopOpen(false);
                setIsProfessionPopOpen(false);
                Keyboard.dismiss();
              }}>
              <View style={styles.mg_bottom}>
                {/* BASIC INFORMATION */}

                <View
                  style={[styles.basic_info_container, GLOBALSTYLE.mg_top_xs]}>
                  <Text
                    style={[
                      GLOBALSTYLE.small_text_italic,
                      GLOBALSTYLE.mg_bottom_xs,
                    ]}>
                    (<Text style={[GLOBALSTYLE.required]}>*</Text> indicates
                    required fields)
                  </Text>
                  <Text style={GLOBALSTYLE.medium_title}>
                    Basic Information
                  </Text>
                  <View style={GLOBALSTYLE.mg_top_xs}>
                    <Input
                      _WIDTH={'100%'}
                      _REF={titleRef}
                      _ONCHANGE={onChangeTitle}
                      _PLACEHOLDER="Enter Job Title"
                      _VALUE={titleInput}
                      _ISBORDER={true}
                      _LABEL={
                        <>
                          Job Title<Text style={GLOBALSTYLE.required}>*</Text>
                        </>
                      }
                    />
                    {titleError && (
                      <Text style={GLOBALSTYLE.error_text}>{titleError}</Text>
                    )}
                  </View>

                  <Dropdown
                    _ISBORDER={true}
                    _DATA={profession}
                    _LABLE={
                      <>
                        Profession
                        <Text style={GLOBALSTYLE.required}>*</Text>
                      </>
                    }
                    _ITEM_PLACEHOLDER="Select Profession"
                    _SELECTED_ITEM={selectedProfession}
                    _IS_DROPDOWN_OPEN={isProfessionPopOpen}
                    _HANDLE_ITEM_SELECTION={handleProfessionSelection}
                    _SHOW_HIDE_DROPDOWN={handleShowHideProfession}
                  />

                  {professionError && (
                    <Text style={GLOBALSTYLE.error_text}>
                      {professionError}
                    </Text>
                  )}

                  <View style={GLOBALSTYLE.mg_top_s}>
                    <Text
                      style={[
                        GLOBALSTYLE.input_label,
                        GLOBALSTYLE.mg_bottom_xs,
                      ]}>
                      Location<Text style={GLOBALSTYLE.required}>*</Text>
                    </Text>

                    {/* <GooglePlacesAutocomplete
                      placeholder="Find Your Place"
                      predefinedPlaces={[]}
                      onPress={(data, details: any) => {
                        dispatch(setLocation(data.structured_formatting.main_text));
                        dispatch(setLocationError(''));
                        console.log('details:', details.geometry.location.lat);
                        dispatch(setLatitude(details.geometry.location.lat));
                        dispatch(setLongitude(details.geometry.location.lng));
                      }}
                      keyboardShouldPersistTaps="handled"
                      styles={{
                        textInput: styles.input_style,
                        predefinedPlacesDescription: {
                          color: '#1faadb',
                        },
                      }}
                      textInputProps={{
                        // value: location,
                        defaultValue: location,
                        // onChangeText: text => setLocation(text),
                      }}
                      query={{key: GOOGLE_API_KEY}}
                      fetchDetails={true}
                      onFail={error => console.log(error)}
                      onNotFound={() => console.log('no results')}
                      listEmptyComponent={() => (
                        <View style={{flex: 1}}>
                          <Text
                            style={[
                              GLOBALSTYLE.subTitle,
                              GLOBALSTYLE.text_center,
                            ]}>
                            No results were found
                          </Text>
                        </View>
                      )}
                    /> */}

                    <TouchableOpacity
                      style={styles.dropdown_container}
                      activeOpacity={0.7}
                      onPress={handlLocationSearch}>
                      <View style={GLOBALSTYLE.flex}>
                        {!location ? (
                          <View style={GLOBALSTYLE.row}>
                            <Text style={GLOBALSTYLE.input_title_grey}>
                              Search Location
                            </Text>
                          </View>
                        ) : (
                          <View style={GLOBALSTYLE.row}>
                            <Text style={GLOBALSTYLE.input_title}>
                              {location}
                            </Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>

                    {locationError && (
                      <Text style={GLOBALSTYLE.error_text}>
                        {locationError}
                      </Text>
                    )}
                  </View>
                  {/* SOFTWARE */}

                  <View style={GLOBALSTYLE.mg_top_s}>
                    <Text
                      style={[
                        GLOBALSTYLE.input_label,
                        GLOBALSTYLE.mg_bottom_xs,
                      ]}>
                      Software
                      <Text style={GLOBALSTYLE.required}>*</Text>
                    </Text>
                    <View style={styles.software_container}>
                      <FlatList
                        bounces={false}
                        numColumns={2}
                        data={software}
                        removeClippedSubviews={false}
                        keyExtractor={item => item.value.toString()}
                        renderItem={({
                          item,
                        }: {
                          item: {key: string; value: number};
                        }) => (
                          <RenderSoftware
                            item={item}
                            selectedSoftware={selectedSoftware}
                            onSelect={() => handleSoftwareSelection(item.value)}
                          />
                        )}
                      />
                    </View>
                    {softwareError && (
                      <Text style={GLOBALSTYLE.error_text}>
                        {softwareError}
                      </Text>
                    )}
                  </View>

                  <View style={GLOBALSTYLE.mg_top_s}>
                    <Input
                      _ISBORDER={true}
                      _WIDTH={'100%'}
                      _ONCHANGE={onChangeVacancy}
                      _PLACEHOLDER="Ex- 12"
                      _VALUE={vacancy}
                      _LABEL={
                        <>
                          Vacancy <Text style={GLOBALSTYLE.required}>*</Text>
                        </>
                      }
                      _KEYBOARDTYPE="numeric"
                    />
                  </View>
                  {vacancyError && (
                    <Text style={GLOBALSTYLE.error_text}>{vacancyError}</Text>
                  )}

                  {/* URGENT */}
                  <View style={GLOBALSTYLE.mg_top_s}>
                    <Radio
                      _DATA={urgentData}
                      _HANDLE_SELECTION={handleUrgentSelection}
                      _SELECTED_ITEM={urgent}
                      _TITLE={<>Need Staff Urgently?</>}
                    />
                  </View>
                </View>

                {/* COMPENSATION */}
                <View
                  style={[styles.basic_info_container, GLOBALSTYLE.mg_top_s]}>
                  <Text style={GLOBALSTYLE.medium_title}>Compensation</Text>
                  <Text
                    style={[
                      GLOBALSTYLE.input_label,
                      GLOBALSTYLE.mg_top_xs,
                      GLOBALSTYLE.mg_bottom_xs,
                    ]}>
                    Salary Range (Per Year)
                  </Text>
                  <View style={[GLOBALSTYLE.flex]}>
                    <View style={{width: '48%'}}>
                      <Input
                        _ISBORDER={true}
                        _WIDTH={'100%'}
                        _ONCHANGE={onChangeFromSalary}
                        _PLACEHOLDER="From $"
                        _VALUE={fromSalary}
                        _LABEL={''}
                        _KEYBOARDTYPE="number-pad"
                      />
                    </View>

                    <Text style={[GLOBALSTYLE.subTitle]}>-</Text>
                    <View style={{width: '48%'}}>
                      <Input
                        _ISBORDER={true}
                        _WIDTH={'100%'}
                        _ONCHANGE={onChangeToSalary}
                        _PLACEHOLDER="To $"
                        _VALUE={toSalary}
                        _KEYBOARDTYPE="number-pad"
                      />
                    </View>
                  </View>
                  <Text style={GLOBALSTYLE.error_text}>{salaryError}</Text>
                  <View style={GLOBALSTYLE.mg_top_s}>
                    <Text
                      style={[
                        GLOBALSTYLE.input_label,
                        GLOBALSTYLE.mg_bottom_xs,
                      ]}>
                      Benefits
                    </Text>

                    <View style={styles.input_width}>
                      <Input
                        _ISBORDER={true}
                        _WIDTH={'88%'}
                        _ONCHANGE={onChangeAddBenifitsInput}
                        _PLACEHOLDER="Add Benefits"
                        _VALUE={benifitsInput.slice(0, 40)}
                        _KEYBOARDTYPE="default"
                      />
                      <TouchableOpacity
                        activeOpacity={1}
                        style={styles.add_btn}
                        onPress={handleAddBenifits}>
                        <Text style={[GLOBALSTYLE.subTitle_white]}>Add</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={[GLOBALSTYLE.mg_top_xs, styles.gap]}>
                      <Animated.FlatList
                        data={
                          isAllBenifitsVisible
                            ? filteredBenifits
                            : filteredBenifits.slice(0, 4)
                        }
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                          <RenderBenefits
                            item={item}
                            setFilteredBenifits={setFilteredBenifits}
                          />
                        )}
                      />
                      {filteredBenifits.length > 4 && (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={viewAll}
                          style={[
                            GLOBALSTYLE.row,
                            GLOBALSTYLE.gap_xs,
                            GLOBALSTYLE.mg_top_xs,
                          ]}>
                          <Text style={GLOBALSTYLE.subTitleActive}>
                            View All
                          </Text>
                          <Image
                            source={arrowRight}
                            style={styles.arrow_right}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>

                {/* JOB DETAIL */}
                <View
                  style={[styles.basic_info_container, GLOBALSTYLE.mg_top_s]}>
                  <Text style={GLOBALSTYLE.medium_title}>Job Details</Text>
                  <View style={[GLOBALSTYLE.mg_top_s]}>
                    <Text
                      style={[
                        GLOBALSTYLE.input_label,
                        GLOBALSTYLE.mg_bottom_xs,
                      ]}>
                      Job Description<Text style={GLOBALSTYLE.required}>*</Text>
                    </Text>
                    <TextInput
                      value={descriptionInput?.slice(0, 1000)}
                      onChangeText={handleChangeDescription}
                      placeholder="Write your description"
                      placeholderTextColor={'grey'}
                      multiline
                      style={styles.input_area}
                    />
                    {descriptionError && (
                      <Text style={GLOBALSTYLE.error_text}>
                        {descriptionError}
                      </Text>
                    )}
                  </View>

                  {/* EXPERIENCE LEVEL */}
                  <Dropdown
                    _ISBORDER={true}
                    _DATA={experienceLevel}
                    _LABLE={
                      <>
                        Experience Level
                        <Text style={GLOBALSTYLE.required}>*</Text>
                      </>
                    }
                    _ITEM_PLACEHOLDER="Select experience level here"
                    _SELECTED_ITEM={selectedExperience}
                    _IS_DROPDOWN_OPEN={isExpPopOpen}
                    _HANDLE_ITEM_SELECTION={handleExperienceSelection}
                    _SHOW_HIDE_DROPDOWN={handleShowHideExperience}
                  />
                  {experienceError && (
                    <Text style={GLOBALSTYLE.error_text}>
                      {experienceError}
                    </Text>
                  )}

                  {/* SHIFT */}
                  <View style={GLOBALSTYLE.mg_top_s}>
                    <Text
                      style={[
                        GLOBALSTYLE.input_label,
                        GLOBALSTYLE.mg_bottom_xs,
                      ]}>
                      Working Hours
                      <Text style={GLOBALSTYLE.required}>*</Text>
                    </Text>
                    <FlatList
                      bounces={false}
                      numColumns={2}
                      data={workingHours}
                      removeClippedSubviews={false}
                      keyExtractor={item => item.value.toString()}
                      renderItem={({
                        item,
                      }: {
                        item: {key: string; value: number};
                      }) => (
                        <RenderWorkingHours
                          item={item}
                          selectedWorkingHours={selectedWorkingHours}
                          onSelect={() => handleWorkingHoursSelection(item.key)}
                        />
                      )}
                    />
                    {workingHoursError && (
                      <Text style={GLOBALSTYLE.error_text}>
                        {workingHoursError}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={GLOBALSTYLE.mg_top_s}>
                  <Button
                    _TEXT={`${route.params?.id ? 'Update Job' : 'Create Job'}`}
                    _ONPRESS={handleCreateJob}
                    _BTNSTYLE={GLOBALSTYLE.btn_container}
                    _TEXT_STYLE={GLOBALSTYLE.button}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView>
      </View>
      {isDatePickerOpen && (
        <View style={styles.date_picker_container}>
          <DateTimePicker
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            value={selectedDate}
            onChange={handleDateChange}
            minimumDate={new Date()}
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
      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}

      {isPopOpen && (
        <Popup
          _TITLE={
            !isClinicCreated
              ? 'Required'
              : !isClinicVerified
              ? 'Required'
              : 'Blocked'
          }
          _DESCRIPTION={
            !isClinicCreated
              ? 'Before creating jobs, you need to create a Clinic.'
              : !isClinicVerified
              ? 'Your clinic has not been verified yet to create jobs. It usually takes upto 24 hours.'
              : 'Your clinic has been blocked due to a violation. Please contact our customer support for assistance.'
          }
          _BTN_TEXT={
            !isClinicCreated
              ? 'Create Clinic'
              : !isClinicVerified
              ? 'I Understand'
              : 'Help & Support'
          }
          _ONPRESS={handleNavigateCreateClinic}
          _IMG={alert}
        />
      )}

      {isJobCreated && (
        <Popup
          _TITLE={'Successful'}
          _DESCRIPTION={`Job has been ${
            route.params?.id ? 'updated' : 'created'
          } successfully.`}
          _BTN_TEXT={'See All Jobs'}
          _ONPRESS={handlePostedJobs}
          _IMG={success}
        />
      )}

      {apiNotRespond && (
        <ToastPopup
          _TYPE="error"
          _TEXT1="Something went wrong"
          _TEXT2="Something went wrong, please try later"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
      {isProfileNotCreated && (
        <Popup
          _TITLE={'Profile Required'}
          _DESCRIPTION={'You have to create profile first to create jobs.'}
          _BTN_TEXT={'Create Profile'}
          _ONPRESS={hanldeBackToProfile}
          _IMG={alert}
        />
      )}
    </>
  );
};

export default CreateJob;
