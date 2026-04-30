import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  axios,
  NativeStackNavigationProp,
  RouteProp,
  SafeAreaView,
  useNavigation,
  useSelector,
  useDispatch,
} from '../../../components/store/ExternalLibrary';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {MainStackIF} from '../../../types/MainStackTypes';
import {CandidateProfiles} from '../../../components/store/ComponentStore';
import {CandidateIF} from '../../../types/DataTypes';
import {backMain, filter} from '../../../components/store/ImageStore';
import styles from './StyleSearchedJobs';
import SearchFilter from '../../../components/home/search_filter/SearchFilter';
import {RootState} from '../../../redux/store/Store';
import {setPermanentOppFilter} from '../../../redux/slices/ProfileSlice';
type routeProp = RouteProp<MainStackIF, 'SEARCHED_CANDIDATES'>;
type navigationType = NativeStackNavigationProp<MainStackIF>;
const SearchedCandidates = ({route}: {route: routeProp}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState<CandidateIF[]>([]);
  const routes = route.params;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<navigationType>();
  const {
    softwareExpFilter,
    professionFilter,
    experienceFilter,
    typesOfExpFilter,
    permanentOppFilter,
    languageFilter,
    ratingFilter,
  } = useSelector((state: RootState) => state.profileSlice.filter);
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'https://fillin-admin.cyberxinfosolution.com/api/dashboard',
        {
          params: {
            latitude: routes.latitude,
            longitude: routes.longitude,
            search: routes.searchText,
            location: routes.location,
            profession: professionFilter,
            software: softwareExpFilter,
            year_of_experiance: experienceFilter,
            type_of_experiance: typesOfExpFilter,
            permanent_opp: permanentOppFilter,
            language: languageFilter,
            rating: ratingFilter,
          },
        },
      );
      if (response.status == 200) {
        console.log('response in fetch dashboard:', response.data.data.jobs);
        setCandidates(response.data.data.candidate);
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

  useEffect(() => {
    fetchDashboardData();
  }, [isFilterOpen]);

  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const backHanldler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );
    return () => backHanldler.remove();
  }, [navigation]);

  return (
    <>
      <SafeAreaView
        style={GLOBALSTYLE.safeContainer}
        edges={['top', 'left', 'right']}>
        <View style={GLOBALSTYLE.container}>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 100}>
            <View style={[GLOBALSTYLE.flex, GLOBALSTYLE.mg_bottom_xs]}>
              {/* <Text style={GLOBALSTYLE.input_label}>Apply Filter</Text> */}

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleBack}
                hitSlop={20}>
                <Image source={backMain} style={GLOBALSTYLE.back_btn} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={handleFilter}>
                <Image source={filter} style={styles.filter_img} />
              </TouchableOpacity>
            </View>
            <Text style={[GLOBALSTYLE.small_title, GLOBALSTYLE.mg_bottom_xs]}>
              {`${candidates.length} Candidate${
                candidates.length <= 1 ? '' : 's'
              } Found`}
            </Text>

            {candidates.length > 0 ? (
              <FlatList
                data={candidates}
                removeClippedSubviews={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <CandidateProfiles item={item} />}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <Text style={[GLOBALSTYLE.small_title, GLOBALSTYLE.text_center]}>
                No Dental Professionals Found
              </Text>
            )}
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
      {isFilterOpen && (
        <SearchFilter
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
      )}

      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}
    </>
  );
};

export default SearchedCandidates;
