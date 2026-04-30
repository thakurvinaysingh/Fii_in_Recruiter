import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  backMain,
  search,
  searchGrey,
} from '../../../components/store/ImageStore';
import {
  NativeStackNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '../../../components/store/ExternalLibrary';
import styles from './StyleApplicants';
import {RenderApplicants} from '../../../components/store/ComponentStore';
import {MainStackIF} from '../../../types/MainStackTypes';
import {gettingApplicantsById} from '../../../api/ApiServices';
import {ApplicantsByIdIF} from '../../../types/DataTypes';
import Theme from '../../../theme/Theme';
type propType = RouteProp<MainStackIF, 'APPLICANTS'>;
const Applicants = () => {
  const routes = useRoute<propType>();
  const params = routes.params;
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [applicants, setApplicants] = useState<ApplicantsByIdIF[]>([]);
  const [isNewTodaysSelected, setIsNewTodaysSelected] = useState(false);
  const [isTotalSelected, setIsTotalSelected] = useState(true);
  const [isOtherFiltersHide, setIsOtherFiltersHide] = useState(false);
  const handleNewTodaysSelection = () => {
    setIsNewTodaysSelected(true);
    setIsTotalSelected(false);
  };

  const handleTotalSelection = () => {
    setIsNewTodaysSelected(false);
    setIsTotalSelected(true);
  };

  const applicantsFilterData = [
    'Application Sent',
    'Application Viewed',
    'Interview Scheduled',
    'Resume Downloaded',
  ];

  const handleBack = () => {
    navigation.goBack();
  };
  const onSearch = (val: string) => {
    setSearchInput(val);
    if (val) {
      setIsOtherFiltersHide(true);
    } else {
      setIsOtherFiltersHide(false);
    }
  };

  const handleCategorySelection = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // EXTRACT TODAYS TOTAL INTERVIEW
  const todaysTotalApplicants = applicants.filter(applicant => {
    return isToday(applicant.applied_date);
  });

  // FILTERING THE APPLICANTS BY JOB STATUS
  const filteredApplicants = useMemo(() => {
    let result = [...applicants];
    // FILTER FOR "NEW TODAY" IF SELECTED
    if (isNewTodaysSelected) {
      const today = new Date();
      result = result.filter((applicant: any) => {
        const appliedDate = new Date(applicant?.applied_date);

        return (
          appliedDate.getFullYear() === today.getFullYear() &&
          appliedDate.getMonth() === today.getMonth() &&
          appliedDate.getDate() === today.getDate()
        );
      });
    }
    // FILTER FOR SEARCH INPUT
    if (searchInput.trim()) {
      const searchTerm = searchInput.toLowerCase().trim();
      result = result.filter(
        applicant =>
          applicant?.name?.toLowerCase().includes(searchTerm) ||
          applicant?.profession?.toLowerCase().includes(searchTerm) ||
          applicant?.location?.toLowerCase().includes(searchTerm),
      );
    }

    // FILTER FOR STATUS CATEGORY
    if (selectedCategory !== 'All') {
      result = result.filter(item => {
        const lastStatus =
          item?.applied_track?.[item?.applied_track?.length - 1]?.toLowerCase();
        return lastStatus === selectedCategory?.toLowerCase();
      });
    }

    return result;
  }, [applicants, searchInput, selectedCategory, isNewTodaysSelected]);

  // GETTING ALL CANDIDATE LIST
  useEffect(() => {
    let isMounted = true;

    const getCaniddateById = async (id: number) => {
      try {
        setIsLoading(true);
        const res = await gettingApplicantsById(id);
        if (isMounted && res.success) {
          setApplicants(res.data.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error while getting applicants by id:', err);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    getCaniddateById(params.jobId);

    return () => {
      isMounted = false;
    };
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
            <Text style={GLOBALSTYLE.authTitle_small}>Applicants</Text>
            <Text></Text>
          </View>

          <View
            style={[
              styles.search_container,
              GLOBALSTYLE.mg_top_s,
              GLOBALSTYLE.mg_bottom_xs,
            ]}>
            <Image source={searchGrey} style={styles.search_img} />
            <TextInput
              value={searchInput}
              onChangeText={onSearch}
              style={styles.search_input}
              placeholder="Search Applicants"
              placeholderTextColor={Theme.COLORS.GREY}
            />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {!isOtherFiltersHide && (
              <>
                <View style={styles.container}>
                  <View style={GLOBALSTYLE.flex}>
                    <TouchableOpacity
                      style={isTotalSelected ? styles.box_active : styles.box}
                      activeOpacity={0.8}
                      onPress={handleTotalSelection}>
                      <Text
                        style={[
                          isTotalSelected
                            ? GLOBALSTYLE.authTitle_medium_white
                            : GLOBALSTYLE.authTitle_medium,
                        ]}>
                        {applicants.length}
                      </Text>
                      <Text
                        style={[
                          isTotalSelected
                            ? GLOBALSTYLE.subTitle_white
                            : GLOBALSTYLE.subTitle,
                        ]}>
                        Total Applicants
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={
                        isNewTodaysSelected ? styles.box_active : styles.box
                      }
                      activeOpacity={0.8}
                      onPress={handleNewTodaysSelection}>
                      <Text
                        style={[
                          isNewTodaysSelected
                            ? GLOBALSTYLE.authTitle_medium_white
                            : GLOBALSTYLE.authTitle_medium,
                        ]}>
                        {todaysTotalApplicants.length}
                      </Text>
                      <Text
                        style={[
                          isNewTodaysSelected
                            ? GLOBALSTYLE.subTitle_white
                            : GLOBALSTYLE.subTitle,
                        ]}>
                        New Today
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={[GLOBALSTYLE.mg_top_s, GLOBALSTYLE.mg_bottom_xs]}>
                  <FlatList
                    removeClippedSubviews={false}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={['All', ...applicantsFilterData]}
                    contentContainerStyle={styles.category_container_parent}
                    keyExtractor={item => item}
                    renderItem={({item}) => {
                      const capitalized =
                        item.charAt(0).toUpperCase() + item.slice(1);
                      return (
                        <TouchableOpacity
                          onPress={() => handleCategorySelection(item)}
                          style={
                            item === selectedCategory
                              ? styles.category_container_active
                              : styles.category_container
                          }
                          activeOpacity={0.7}>
                          <Text
                            style={
                              item === selectedCategory
                                ? GLOBALSTYLE.subTitle_white
                                : GLOBALSTYLE.subTitle
                            }>
                            {capitalized}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </>
            )}

            <View style={[GLOBALSTYLE.mg_top_xs, styles.mg_bottom]}>
              {filteredApplicants.length !== 0 ? (
                <FlatList
                  data={filteredApplicants}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => (
                    <RenderApplicants item={item} jobId={params.jobId} />
                  )}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={false}
                />
              ) : (
                <Text
                  style={[GLOBALSTYLE.small_title, GLOBALSTYLE.text_center]}>
                  No Applicant Found
                </Text>
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
    </>
  );
};

export default Applicants;
