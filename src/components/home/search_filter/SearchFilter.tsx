import {
  BackHandler,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {gettingDynamicData} from '../../../api/ApiServices';
import {Button, Checkbox} from '../../store/ComponentStore';
import styles from './StyleSearchFilter';
import {
  backMain,
  ellipsEmpty,
  ellipsFilled,
  rectangleEmpty,
  rectangleFilled,
} from '../../store/ImageStore';
import {RH, useSelector, useDispatch} from '../../store/ExternalLibrary';
import {
  experienceYearsSingle,
  permanentOpp,
  reating,
  typesOfExp,
} from '../../../constants/Data';
import {RootState} from '../../../redux/store/Store';
import {
  setExperienceFilter,
  setLanguageFilter,
  setPermanentOppFilter,
  setProfessionFilter,
  setRatingFilter,
  setSoftwareExpFilter,
  setTypesOfExpFilter,
} from '../../../redux/slices/ProfileSlice';

const SearchFilter = ({
  isFilterOpen,
  setIsFilterOpen,
}: {
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [softwareExperience, setSoftwareExperience] = useState([]);
  const [profession, setProfession] = useState([]);
  const [selectedRatingLocal, setSelectedRatingLocal] = useState<string[]>([]);
  const [languages, setLanguages] = useState([]);
  const dispatch = useDispatch();
  const {
    softwareExpFilter,
    professionFilter,
    experienceFilter,
    typesOfExpFilter,
    permanentOppFilter,
    languageFilter,
  } = useSelector((state: RootState) => state.profileSlice.filter);
  const handleBack = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    const backHanldler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setIsFilterOpen(!isFilterOpen);
        return true;
      },
    );
    return () => backHanldler.remove();
  }, [isFilterOpen]);

  // SOFTWARE SELECTION
  const handleSoftwareExperience = (value: number) => {
    let updatedValues: number[];

    if (!softwareExpFilter.includes(value)) {
      updatedValues = [...softwareExpFilter, value];
    } else {
      updatedValues = softwareExpFilter.filter(item => item !== value);
    }
    // setSelectedSoftwareExp(updatedValues);
    dispatch(setSoftwareExpFilter(updatedValues));
  };

  // LANGUAGE SELECTION
  const handleLanguageSelection = (value: number) => {
    let updatedValues: number[];

    if (!languageFilter.includes(value)) {
      updatedValues = [...languageFilter, value];
    } else {
      updatedValues = languageFilter.filter(item => item !== value);
    }
    dispatch(setLanguageFilter(updatedValues));
  };

  const handleApplyFilter = () => {
    let parsed = selectedRatingLocal.map(rating => parseInt(rating.charAt(0)));
    dispatch(setRatingFilter(parsed));
    setIsFilterOpen(!isFilterOpen);
  };

  // PROFESSION SELECTION
  const handleProfessionSelection = (value: number) => {
    let updatedValues: number[];

    if (!professionFilter.includes(value)) {
      updatedValues = [...professionFilter, value];
    } else {
      updatedValues = professionFilter.filter(item => item !== value);
    }
    // setSelectedProfession(updatedValues);
    dispatch(setProfessionFilter(updatedValues));
  };

  // TYPES OF EXPERIENCE SELECTION
  const handleTypesOfExpSelection = (item: string) => {
    if (!typesOfExpFilter.includes(item)) {
      dispatch(setTypesOfExpFilter([item, ...typesOfExpFilter]));
    } else {
      let filter = typesOfExpFilter.filter(shift => shift !== item);
      dispatch(setTypesOfExpFilter(filter));
    }
  };

  // PERMANENT OPPORTUNITY SELECTION
  const handlePermanentOPpSelection = (item: string) => {
    dispatch(setPermanentOppFilter(item));
  };

  // EXPERIENCE SELECTION
  const handleYearsSelection = (item: string) => {
    if (!experienceFilter.includes(item)) {
      // setSelectedExperience([item, ...experienceFilter]);
      dispatch(setExperienceFilter([item, ...experienceFilter]));
    } else {
      let filter = experienceFilter.filter(shift => shift !== item);
      // setSelectedExperience(filter);
      dispatch(setExperienceFilter(filter));
    }
  };

  //  RATING SELECTION
  const handleRatingSelection = (item: string) => {
    if (!selectedRatingLocal.includes(item)) {
      setSelectedRatingLocal([item, ...selectedRatingLocal]);
      //   dispatch(setRatingFilter([item, ...ratingFilter]));
    } else {
      let filter = selectedRatingLocal.filter(shift => shift !== item);
      setSelectedRatingLocal(filter);
      //   dispatch(setRatingFilter(filter));
    }
  };

  // GETTING THE DYNAMIC DATA THAT WILL SHOWING THE DROPDOWN CHECKBOXES, AND RADIOS
  const getDynamicDa = async () => {
    try {
      const res = await gettingDynamicData();
      if (res.success) {
        console.log('res of dynamic data:', res.data.data);
        setSoftwareExperience(res.data.data.software);
        setProfession(res.data.data.profession);
        setLanguages(res.data.data.language);
      } else {
        console.warn('Error in dynamic data:', res.err);
      }
    } catch (err: any) {
      console.error('Error in dynamic data:', err);
    }
  };

  useEffect(() => {
    getDynamicDa();
  }, []);
  return (
    <>
      <View style={[GLOBALSTYLE.container, styles.filter_container]}>
        <SafeAreaView style={GLOBALSTYLE.safeContainer}>
          <ScrollView
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}>
            <View style={GLOBALSTYLE.flex}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleBack}
                hitSlop={20}>
                <Image source={backMain} style={GLOBALSTYLE.back_btn} />
              </TouchableOpacity>
              <Text style={[GLOBALSTYLE.authTitle_small, styles.left_margin]}>
                Search Filter
              </Text>

              <Text></Text>
            </View>
            {/* SOFTWARE EXPERIENCE */}
            <View style={GLOBALSTYLE.mg_top_s}>
              <Checkbox
                _DATA={softwareExperience}
                _HANDLE_SELECTION={handleSoftwareExperience}
                _SELECTED_ITEM={softwareExpFilter}
                _TITLE={'Software Experience'}
                _TWO_COLUMNS={false}
              />
            </View>

            {/* PROFESSION */}
            <View style={GLOBALSTYLE.mg_top_xs}>
              <Checkbox
                _DATA={profession}
                _HANDLE_SELECTION={handleProfessionSelection}
                _SELECTED_ITEM={professionFilter}
                _TITLE={'Profession'}
                _TWO_COLUMNS={false}
              />
            </View>

            {/* PERMANENT OPPORTUNITY */}
            <View style={GLOBALSTYLE.mg_top_xs}>
              <Text style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                Permanent Opportunity
              </Text>
              {/* <FlatList
              removeClippedSubviews={false}
              data={permanentOpp}
              keyExtractor={item => item}
              contentContainerStyle={{
                flexDirection: 'row',
                gap: RH(2),
                flexWrap: 'wrap',
              }}
              renderItem={({item}) => (
                <TouchableOpacity
                  hitSlop={10}
                  activeOpacity={0.8}
                  style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}
                  onPress={() => handlePermanentOPpSelection(item)}>
                  <Image
                    source={
                      permanentOppFilter.includes(item)
                        ? rectangleFilled
                        : rectangleEmpty
                    }
                    style={styles.selection_img}
                  />
                  <Text style={GLOBALSTYLE.small_title}>{item}</Text>
                </TouchableOpacity>
              )}
            /> */}

              <View
                style={[
                  GLOBALSTYLE.row,
                  GLOBALSTYLE.gap_s,
                  {flexWrap: 'wrap'},
                ]}>
                {permanentOpp.map(item => (
                  <TouchableOpacity
                    hitSlop={20}
                    activeOpacity={0.8}
                    onPress={() => handlePermanentOPpSelection(item)}
                    style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
                    <Image
                      source={
                        item === permanentOppFilter ? ellipsFilled : ellipsEmpty
                      }
                      style={styles.selection_img}
                    />
                    <Text style={GLOBALSTYLE.small_title}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={GLOBALSTYLE.mg_top_xs}>
              <Text style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                Types of Experience
              </Text>
              <FlatList
                removeClippedSubviews={false}
                data={typesOfExp}
                keyExtractor={item => item}
                contentContainerStyle={{
                  flexDirection: 'row',
                  gap: RH(2),
                  flexWrap: 'wrap',
                }}
                renderItem={({item}) => (
                  <TouchableOpacity
                    hitSlop={10}
                    activeOpacity={0.8}
                    style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}
                    onPress={() => handleTypesOfExpSelection(item)}>
                    <Image
                      source={
                        typesOfExpFilter.includes(item)
                          ? rectangleFilled
                          : rectangleEmpty
                      }
                      style={styles.selection_img}
                    />
                    <Text style={GLOBALSTYLE.small_title}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            {/* EXPERIENCE */}
            <View style={GLOBALSTYLE.mg_top_xs}>
              <Text style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                Experience Level
              </Text>
              <FlatList
                removeClippedSubviews={false}
                data={experienceYearsSingle}
                keyExtractor={item => item}
                contentContainerStyle={{
                  flexDirection: 'row',
                  gap: RH(2),
                  flexWrap: 'wrap',
                }}
                renderItem={({item}) => (
                  <TouchableOpacity
                    hitSlop={10}
                    activeOpacity={0.8}
                    style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}
                    onPress={() => handleYearsSelection(item)}>
                    <Image
                      source={
                        experienceFilter.includes(item)
                          ? rectangleFilled
                          : rectangleEmpty
                      }
                      style={styles.selection_img}
                    />
                    <Text style={GLOBALSTYLE.small_title}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            {/* RATING */}
            <View style={GLOBALSTYLE.mg_top_xs}>
              <Text style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                Rating
              </Text>
              <FlatList
                removeClippedSubviews={false}
                data={reating}
                keyExtractor={item => item.toString()}
                contentContainerStyle={{
                  flexDirection: 'row',
                  gap: RH(2),
                  flexWrap: 'wrap',
                }}
                renderItem={({item}) => (
                  <TouchableOpacity
                    hitSlop={10}
                    activeOpacity={0.8}
                    style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}
                    onPress={() => handleRatingSelection(item)}>
                    <Image
                      source={
                        selectedRatingLocal.includes(item)
                          ? rectangleFilled
                          : rectangleEmpty
                      }
                      style={styles.selection_img}
                    />
                    <Text style={GLOBALSTYLE.small_title}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={GLOBALSTYLE.mg_top_xs}>
              <Checkbox
                _DATA={languages}
                _HANDLE_SELECTION={handleLanguageSelection}
                _SELECTED_ITEM={languageFilter}
                _TITLE={'Languages'}
                _TWO_COLUMNS={false}
              />
            </View>

            <View style={[GLOBALSTYLE.mg_top_xs, GLOBALSTYLE.mg_bottom_xs]}>
              <Button
                _TEXT="Apply Filter"
                _ONPRESS={handleApplyFilter}
                _BTNSTYLE={GLOBALSTYLE.btn_container}
                _TEXT_STYLE={GLOBALSTYLE.button}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

export default SearchFilter;
