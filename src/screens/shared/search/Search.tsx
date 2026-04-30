import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  closeSmall,
  history,
  location,
  backMain,
} from '../../../components/store/ImageStore';
import Theme from '../../../theme/Theme';
import styles from './StyleSearch';
import {
  GooglePlacesAutocomplete,
  NativeStackNavigationProp,
  SafeAreaView,
  useNavigation,
  useSelector,
  useDispatch,
} from '../../../components/store/ExternalLibrary';

import {Button} from '../../../components/store/ComponentStore';
import {MainStackIF} from '../../../types/MainStackTypes';
import {
  setExperienceFilter,
  setLanguageFilter,
  setPermanentOppFilter,
  setProfessionFilter,
  setShiftFilter,
  setSoftwareExpFilter,
  setTypesOfExpFilter,
} from '../../../redux/slices/ProfileSlice';
import {RootState} from '../../../redux/store/Store';
import {BottomTabParamList} from '../../../types/BottomTabParamList';
type navigationType = NativeStackNavigationProp<MainStackIF>;
type tabNavigationType = NativeStackNavigationProp<BottomTabParamList>;

type searchTermIF = {
  term: string;
};
const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [address, setAddress] = useState('');
  const [popular, setPopular] = useState<searchTermIF[]>([]);
  const [recent, setRecent] = useState<searchTermIF[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [filteredSearches, setFilteredSearches] = useState(recent);
  const navigation = useNavigation<navigationType>();
  const tabNavigation = useNavigation<tabNavigationType>();
  const token = useSelector((state: RootState) => state.commonSlice.auth_token);
  const [isFocused, setIsFocused] = useState(false);
  console.log('searchInput:', searchInput);
  console.log('address:', address);
  const dispatch = useDispatch();
  const onSearch = (val: string) => {
    setSearchInput(val);
  };

  const handleDeleteSearches = (term: string) => {
    setFilteredSearches(item => item.filter(item => item.term !== term));
  };

  const handleBack = () => {
    navigation.goBack();
    setSearchInput('');
    setAddress('');
    setLat('');
    setLong('');
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        setSearchInput('');
        setAddress('');
        return true;
      },
    );
    return () => backHandler.remove();
  }, [tabNavigation]);

  // NAVIGATING TO SEARCHED JOBS
  const handleSearchCandidatePress = () => {
    if (searchInput) {
      dispatch(setSoftwareExpFilter([]));
      dispatch(setProfessionFilter([]));
      dispatch(setShiftFilter([]));
      dispatch(setExperienceFilter([]));
      dispatch(setPermanentOppFilter(''));
      dispatch(setTypesOfExpFilter(''));
      dispatch(setLanguageFilter(''));
      navigation.navigate('SEARCHED_CANDIDATES', {
        searchText: searchInput,
        location: address,
        latitude: lat,
        longitude: long,
      });
    }
  };
  // GETTING POPULAR SEARCHES
  // const popularSearches = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await gettingPopularSearches();

  //     if (res.success) {
  //       const data = res.data?.data || [];
  //       console.log('res of popular searches list:', data);
  //       setPopular(data.popular);
  //       setRecent(data.recent);
  //       setIsLoading(false);
  //     } else {
  //       console.error('Error while getting popular searches list:', res.err);
  //     }
  //     setIsLoading(false);
  //   } catch (err: any) {
  //     console.error('Error while getting popular searches list:', err);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   popularSearches();
  // }, []);
  // RECENT SEARCHES
  const RenderSearchList = ({item}: {item: searchTermIF}) => {
    return (
      <>
        <View style={[GLOBALSTYLE.flex, GLOBALSTYLE.mg_top_xs]}>
          <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
            <Image source={history} style={styles.small_img} />
            <Text style={GLOBALSTYLE.subTitle}>{item.term}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleDeleteSearches(item.term)}
            hitSlop={30}>
            <Image source={closeSmall} style={styles.small_close_img} />
          </TouchableOpacity>
        </View>
        <View style={[GLOBALSTYLE.hr_line, styles.mg_top_xs]}></View>
      </>
    );
  };

  // POPULAR SEARCHES
  const RenderPopularSearch = ({item}: {item: searchTermIF}) => {
    return (
      <View style={styles.box}>
        <Text style={[GLOBALSTYLE.subTitle, GLOBALSTYLE.text_center]}>
          {item.term}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={GLOBALSTYLE.safeContainer}
      edges={['top', 'left', 'right']}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={GLOBALSTYLE.container}>
          <View style={GLOBALSTYLE.flex}>
            <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
              <Image source={backMain} style={GLOBALSTYLE.back_btn} />
            </TouchableOpacity>
            <Text style={GLOBALSTYLE.authTitle_small}>Search Candidates</Text>
            <Text style={GLOBALSTYLE.authTitle_small}></Text>
          </View>

          <View
            style={[
              styles.search_container,
              GLOBALSTYLE.mg_top_s,
              GLOBALSTYLE.mg_bottom_xs,
            ]}>
            <TextInput
              value={searchInput}
              onChangeText={onSearch}
              style={styles.search_input}
              placeholder="Profession, software"
              placeholderTextColor={Theme.COLORS.GREY}
            />
          </View>
          <View style={{}}>
            <View
              style={{
                width: '100%',
                position: 'absolute',
                zIndex: isFocused ? 1 : -1,
              }}>
              {/* <GooglePlacesAutocomplete
                placeholder="Enter Location"
                onPress={(data, details: any) => {
                  console.log('data:', data.description);
                  setIsFocused(false);
                  setAddress(data.description);
                  if (details?.geometry?.location) {
                    const lat = details?.geometry?.location?.lat;
                    const long = details?.geometry?.location?.lng;
                    setLat(lat.toString());
                    setLong(long.toString());
                  }
                }}
                keyboardShouldPersistTaps="handled"
                styles={{
                  textInput: styles.input_style_without_border,
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
                textInputProps={{
                  value: address,
                  // autoFocus: true,
                  onChangeText: setAddress,
                  placeholderTextColor: Theme.COLORS.GREY,
                  onFocus: () => {
                    setIsFocused(true);
                  },
                }}
                query={{
                  key: process.env.GOOGLE_API_KEY,
                  types: '(cities)',
                }}
                fetchDetails={true}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results')}
              /> */}
            </View>
          </View>
          <View style={GLOBALSTYLE.mg_top_m}>
            <Button
              _TEXT="Search"
              _ONPRESS={handleSearchCandidatePress}
              _BTNSTYLE={GLOBALSTYLE.btn_container}
              _TEXT_STYLE={GLOBALSTYLE.button}
            />
          </View>

          {isLoading ? (
            <View style={GLOBALSTYLE.activity_indicator_container_half}>
              <ActivityIndicator size="large" color="#0165fc" />
            </View>
          ) : (
            <View>
              {token && popular.length > 0 && (
                <View style={GLOBALSTYLE.mg_top_m}>
                  <Text style={GLOBALSTYLE.button_black}>Popular Searches</Text>
                  <View
                    style={[GLOBALSTYLE.mg_top_xs, GLOBALSTYLE.mg_bottom_s]}>
                    <FlatList
                      keyboardDismissMode="on-drag"
                      bounces={false}
                      numColumns={2}
                      data={popular}
                      keyExtractor={item => item.term}
                      renderItem={({item}) => (
                        <RenderPopularSearch item={item} />
                      )}
                    />
                  </View>
                </View>
              )}

              {token && filteredSearches.length > 0 && (
                <>
                  <View style={GLOBALSTYLE.flex}>
                    <Text style={GLOBALSTYLE.button_black}>
                      Recent Searches
                    </Text>
                  </View>
                  <View style={[GLOBALSTYLE.flex, GLOBALSTYLE.mg_top_xs]}>
                    <FlatList
                      keyboardDismissMode="on-drag"
                      bounces={false}
                      data={filteredSearches}
                      keyExtractor={item => item.term}
                      renderItem={({item}) => <RenderSearchList item={item} />}
                    />
                  </View>
                </>
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Search;
