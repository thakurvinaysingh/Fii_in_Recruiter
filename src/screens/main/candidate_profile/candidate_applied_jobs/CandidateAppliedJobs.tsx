import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import GLOBALSTYLE from '../../../../theme/GlobalStyle';
import {backMain} from '../../../../components/store/ImageStore';
import {
  NativeStackNavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
  useDispatch,
  useSelector,
} from '../../../../components/store/ExternalLibrary';
import {MainStackIF} from '../../../../types/MainStackTypes';
import {
  DeleteConfirmationPopup,
  PostedJobs,
  ToastPopup,
} from '../../../../components/store/ComponentStore';
import styles from '../../all_jobs/StyleAllJobs';
import {
  deletingJob,
  gettingCreateJobData,
  gettingJobsAppliedCandidate,
} from '../../../../api/ApiServices';
import {JobType} from '../../../../types/DataTypes';
import {workingHours} from '../../../../constants/Data';
import {
  setDeletePopOpen,
  setIsCandidateAppliedJobsViewing,
} from '../../../../redux/slices/CommonSlice';
import {RootState} from '../../../../redux/store/Store';

type routeProp = RouteProp<MainStackIF, 'CANDIDATE_APPLIED_JOBS'>;

const CandidateAppliedJobs = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const route = useRoute<routeProp>();
  const dispatch = useDispatch();

  const isDeletePopOpen = useSelector(
    (state: RootState) => state.commonSlice.isDeletePopOpen,
  );
  console.log('route.params.candidateId:', route.params.id);

  const [postedJobs, setPostedJobs] = useState<JobType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedShift, setSelectedShift] = useState('All');
  const [isJobDeleted, setIsJobDeleted] = useState(false);
  const [errorDeletingJob, setErrorDeletingJob] = useState(false);
  const [idTobeDeleted, setIdTobeDeleted] = useState<number>(0);
  const [makeProfile, setMakeProfile] = useState(false);
  const [jobsCategoryFilter, setJobsCategoryFilter] = useState<
    {key: string; value: number}[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    // PREVIOUSLY THIS
    // if (route.params.candidateId) {
    //   navigation.navigate('BOTTOM_TAB', {});
    //   console.log('if');
    // } else {
    //   navigation.navigate('ACCOUNT');
    //   console.log('else');
    // }
    // // navigation.goBack();
    // console.log('none');
    navigation.goBack();
    dispatch(setIsCandidateAppliedJobsViewing(false));
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        dispatch(setIsCandidateAppliedJobsViewing(false));
        return true;
      },
    );
    return () => backHandler.remove();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      dispatch(setIsCandidateAppliedJobsViewing(true));
      return () => {
        dispatch(setIsCandidateAppliedJobsViewing(false));
      };
    }, [dispatch]),
  );

  const getJobsCandidateApplied = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await gettingJobsAppliedCandidate(id);
      if (res.success) {
        setPostedJobs(res.data.data);
        console.log('res.data.data:', res.data.data);
      } else if (res.err === 'First, you must be complete Your Profile.') {
        // console.error('Error in getting jobs:', res.err);
        setMakeProfile(true);
      }
    } catch (err: any) {
      console.error('Error fetching jobs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJob = async (id: number) => {
    dispatch(setDeletePopOpen(false));
    setIsLoading(true);
    try {
      const res = await deletingJob(id);
      if (res.success) {
        setIsJobDeleted(true);
        getJobsCandidateApplied(route.params.id);
      } else {
        setErrorDeletingJob(true);
      }
    } catch (err: any) {
      setErrorDeletingJob(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJob = (id: number) => {
    dispatch(setDeletePopOpen(true));
    setIdTobeDeleted(id);
  };

  const gettingDynamicData = async () => {
    setIsLoading(true);
    try {
      const response = await gettingCreateJobData();
      if (response.success) {
        const normalizedEmploymentTypes =
          response?.data?.data?.employment_types.map((item: any) => ({
            key: String(item.key),
            value: item.value,
          }));
        setJobsCategoryFilter([
          {key: 'All', value: 0},
          ...normalizedEmploymentTypes,
        ]);
      } else {
        console.warn('Failed to fetch dynamic job data:', response.err);
      }
    } catch (err: any) {
      console.warn('Error fetching dynamic data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWorkingHourSelection = useCallback((key: string) => {
    setSelectedShift(key);
  }, []);

  const filteredJobs = useMemo(() => {
    let filtered = [...postedJobs];

    if (selectedShift !== 'All') {
      filtered = filtered.filter(
        job => Array.isArray(job?.shift) && job.shift.includes(selectedShift),
      );
    }

    return filtered;
  }, [selectedCategory, selectedShift, postedJobs]);

  useFocusEffect(
    useCallback(() => {
      gettingDynamicData();
    }, []),
  );

  useEffect(() => {
    getJobsCandidateApplied(route.params.id);
  }, []);

  const handleNo = () => dispatch(setDeletePopOpen(false));
  const handleNuteral = () => dispatch(setDeletePopOpen(true));
  const handleYes = () => deleteJob(idTobeDeleted);

  return (
    <>
      <View style={[GLOBALSTYLE.container, styles.mg_bottom]}>
        <SafeAreaView>
          <View style={GLOBALSTYLE.flex}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
              hitSlop={30}>
              <Image source={backMain} style={GLOBALSTYLE.back_btn} />
            </TouchableOpacity>
            <Text style={GLOBALSTYLE.authTitle_small}>
              Applied Jobs by Dental Professional
            </Text>
            <Text />
          </View>

          {/* Working Hours Filter */}
          <View style={GLOBALSTYLE.mg_top_xs}>
            <FlatList
              horizontal
              removeClippedSubviews={false}
              showsHorizontalScrollIndicator={false}
              data={[{key: 'All', value: 0}, ...workingHours]}
              contentContainerStyle={styles.category_container_parent}
              keyExtractor={item => item.key}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleWorkingHourSelection(item.key)}
                  style={
                    item.key === selectedShift
                      ? styles.category_container_active
                      : styles.category_container
                  }
                  activeOpacity={0.7}>
                  <Text
                    style={
                      item.key === selectedShift
                        ? GLOBALSTYLE.subTitle_white
                        : GLOBALSTYLE.subTitle
                    }>
                    {item.key}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Job List */}
          {filteredJobs.length >= 1 ? (
            <>
              <View>
                <Text
                  style={[
                    GLOBALSTYLE.subTitle,
                    GLOBALSTYLE.mg_bottom_xs,
                    GLOBALSTYLE.mg_top_xxs,
                  ]}>
                  (Found {filteredJobs.length}{' '}
                  {filteredJobs.length === 1 ? 'Job' : 'Jobs'})
                </Text>
                <FlatList
                  removeClippedSubviews={false}
                  showsVerticalScrollIndicator={false}
                  data={filteredJobs}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => (
                    <PostedJobs
                      item={item}
                      handleDeleteJob={handleDeleteJob}
                      candidateId={route.params.id}
                    />
                  )}
                />
              </View>
            </>
          ) : (
            <Text
              style={[
                GLOBALSTYLE.subTitle,
                GLOBALSTYLE.text_center,
                GLOBALSTYLE.mg_top_xs,
              ]}>
              No jobs found
            </Text>
          )}
        </SafeAreaView>
      </View>

      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}

      {isJobDeleted && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Job Deleted Successfully!"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}

      {errorDeletingJob && (
        <ToastPopup
          _TYPE="error"
          _TEXT1="Error"
          _TEXT2="Something went wrong"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style_error}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}

      {isDeletePopOpen && (
        <DeleteConfirmationPopup
          _TITLE="Delete"
          _DESCRIPTION="Are you sure you want to delete this job?"
          _HANDLE_NO={handleNo}
          _HANDLE_YES={handleYes}
          _HANDLE_NUTERAL={handleNuteral}
        />
      )}

      {makeProfile && (
        <ToastPopup
          _TYPE="error"
          _TEXT1="Error"
          _TEXT2="Please complete your profile first"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style_error}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
    </>
  );
};

export default CandidateAppliedJobs;
