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
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {backMain} from '../../../components/store/ImageStore';
import {
  NativeStackNavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
  useDispatch,
  useSelector,
} from '../../../components/store/ExternalLibrary';
import {MainStackIF} from '../../../types/MainStackTypes';
import {CandidateProfiles} from '../../../components/store/ComponentStore';
import styles from './StyleAllApplicants';
import {gettingAllJobs} from '../../../api/ApiServices';
import {JobType} from '../../../types/DataTypes';
import {RootState} from '../../../redux/store/Store';

import {CandidateIF} from '../../../types/DataTypes';
import {axios} from '../../../components/store/ExternalLibrary';

type routeProp = RouteProp<MainStackIF, 'ALL_JOBS'>;

const AllListApplicants = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const route = useRoute<routeProp>();
  const dispatch = useDispatch();

  const isDeletePopOpen = useSelector(
    (state: RootState) => state.commonSlice.isDeletePopOpen,
  );
  const {auth_token} = useSelector((state: RootState) => state.commonSlice);
  const [candidate, setCandidate] = useState<CandidateIF[]>([]);
  const [postedJobs, setPostedJobs] = useState<JobType[]>([]);
  const [makeProfile, setMakeProfile] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://fillin-admin.cyberxinfosolution.com/api/dashboard',
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status == 200) {
        setCandidate(response?.data?.data?.candidate);
        setIsLoading(false);
      } else {
        console.error('Error in fetch dashboard:', response.data);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.log('Error in dashboard:', err);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    // PREVIOUSLY THIS
    if (route.params.comeFrom === 'popup') {
      navigation.navigate('BOTTOM_TAB', {});
      console.log('if');
    } else {
      navigation.navigate('ACCOUNT');
      console.log('else');
    }
    // navigation.goBack();
    console.log('none');
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (route.params.comeFrom === 'popup') {
          navigation.navigate('BOTTOM_TAB', {});
        } else {
          navigation.navigate('ACCOUNT');
        }
        return true;
      },
    );
    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

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
              Suggested Dental Professionals
            </Text>
            <Text />
          </View>
          {isLoading && (
            <View style={GLOBALSTYLE.activity_indicator_container}>
              <ActivityIndicator size="large" color="#0165fc" />
            </View>
          )}

          {candidate.length > 0 && (
            <>
              <View style={styles.mg_bottom_main}>
                <FlatList
                  data={candidate}
                  removeClippedSubviews={false}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => <CandidateProfiles item={item} />}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </>
          )}
        </SafeAreaView>
      </View>
    </>
  );
};

export default AllListApplicants;
