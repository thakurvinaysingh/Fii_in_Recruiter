import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {RouteProp, SafeAreaView} from '../../components/store/ExternalLibrary';
import {SharedStackIF} from '../../SharedStackTypes';
import {CandidateIF} from '../../types/DataTypes';
import {CandidateProfiles} from '../../components/store/ComponentStore';
import GLOBALSTYLE from '../../theme/GlobalStyle';
import {search, searchGrey} from '../../components/store/ImageStore';
import Theme from '../../theme/Theme';
import styles from './StyleCandidateByCategories';
type routeProp = RouteProp<SharedStackIF, 'CANDIDATE_BY_CATEGORIES'>;
const CandidateByCategories = ({route}: {route: routeProp}) => {
  const [candidates, setCandidates] = useState<CandidateIF[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateIF[]>(
    [],
  );

  const [searchInput, setSearchInput] = useState('');
  let categories = ['All', 'High Pay', 'Low Pay', 'Top Rated', 'Flexible Pay'];
  const [selectedCategory, setselectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const handleCategorySelection = (item: string) => {
    setselectedCategory(item);

    if (item === 'All') {
      setFilteredCandidates(candidates);
      return;
    }

    let sorted = [...candidates];

    if (item === 'High Pay') {
      sorted = sorted
        .filter(c => c.hourly_rate !== 'Flexible on Pay')
        .sort((a, b) => parseFloat(b.hourly_rate) - parseFloat(a.hourly_rate));
    } else if (item === 'Low Pay') {
      sorted = sorted
        .filter(c => c.hourly_rate !== 'Flexible on Pay')
        .sort((a, b) => parseFloat(a.hourly_rate) - parseFloat(b.hourly_rate));
    } else if (item === 'Top Rated') {
      sorted = sorted.sort((a, b) => b.rating - a.rating);
    } else if (item === 'Flexible Pay') {
      sorted = sorted.filter(c => c.hourly_rate === 'Flexible on Pay');
    }

    setFilteredCandidates(sorted);
  };

  const onSearch = (val: string) => {
    setSearchInput(val);

    if (!val) {
      setFilteredCandidates(candidates);
      return;
    }

    const filtered = candidates.filter(item => {
      const keyword = val.toLowerCase();
      return (
        item.name?.toLowerCase().includes(keyword) ||
        item.profession?.toLowerCase().includes(keyword) ||
        item.location?.toLowerCase().includes(keyword) ||
        item.hourly_rate?.toLowerCase().includes(keyword)
      );
    });

    setFilteredCandidates(filtered);
  };

  const categoryId = route.params.categoryId;

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://fillin-admin.cyberxinfosolution.com/api/dashboard`,
        {
          params: {
            profession: categoryId,
          },
        },
      );
      if (response.status == 200) {
        console.log(
          'response in fetch dashboard:',
          response.data.data.candidate,
        );
        setCandidates(response.data.data.candidate);
        setFilteredCandidates(response.data.data.candidate);
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
  }, [categoryId]);
  return (
    <>
      <SafeAreaView
        style={GLOBALSTYLE.safeContainer}
        edges={['top', 'left', 'right']}>
        <View style={GLOBALSTYLE.container}>
          {/* SEARCH APPLIED JOBS */}
          <View
            style={[
              styles.search_container,
              // GLOBALSTYLE.mg_top_s,
              GLOBALSTYLE.mg_bottom_xs,
            ]}>
            <Image source={searchGrey} style={styles.search_img} />
            <TextInput
              value={searchInput}
              onChangeText={onSearch}
              style={styles.search_input}
              placeholder="Try to find here"
              placeholderTextColor={Theme.COLORS.GREY}
            />
          </View>
          {/* FILTER BUTTONS */}

          {!searchInput && (
            <View style={[GLOBALSTYLE.mg_top_xxs, GLOBALSTYLE.mg_bottom_xs]}>
              <FlatList
                removeClippedSubviews={false}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
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
          )}

          {/* JOB LIST */}
          {filteredCandidates.length > 0 ? (
            <FlatList
              removeClippedSubviews={false}
              showsVerticalScrollIndicator={false}
              data={filteredCandidates}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => <CandidateProfiles item={item} />}
            />
          ) : !isLoading ? (
            <Text style={[GLOBALSTYLE.small_title, GLOBALSTYLE.text_center]}>
              No Profile Found
            </Text>
          ) : (
            <View style={GLOBALSTYLE.activity_indicator_container_half}>
              <ActivityIndicator size="large" color="#0165fc" />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default CandidateByCategories;
