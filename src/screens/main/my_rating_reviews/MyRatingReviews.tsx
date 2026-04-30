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
import React, {JSX, useCallback, useEffect, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {MainStackIF} from '../../../types/MainStackTypes';
import {
  useNavigation,
  NativeStackNavigationProp,
} from '../../../components/store/ExternalLibrary';
import {
  backMain,
  placeholderBig,
  starYellow,
  starYellowHalf,
} from '../../../components/store/ImageStore';
import {reviewsFilterData} from '../../../constants/Data';
import {MyRenderReviews} from '../../../components/store/ComponentStore';
import {personalProfile} from '../../../api/ApiServices';
import {ReviewsIF, UserData} from '../../../types/DataTypes';
import styles from '../rating_reviews/StyleRatingReviews';
type typeNavigationProp = NativeStackNavigationProp<MainStackIF>;
const MyRatingReviews = ({item}: {item: ReviewsIF}) => {
  const navigation = useNavigation<typeNavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [profile, setProfile] = useState<UserData>({
    id: 0,
    name: '',
    email: '',
    practice_name: '',
    established_year: '',
    practice_size: '',
    primarly_looking: '',
    working_hours: [''],
    other_dentistry: null,
    other_practice_role: null,
    address: '',
    postcode: '',
    phone: '',
    profile: '',
    document: null,
    document_name: null,
    reviews: [],
    rating: 0,
    review_count: 0,
    phone_verified: 0,
    created_at: new Date().toISOString(),
    looking: [],
    dentistry: [],
    practice_role: [],
    use_software: [],
  });

  const [filteredReviews, setFilteredReviews] = useState(profile.reviews);
  const [isLoading, setIsLoading] = useState(false);
  const formatRating = (rating: number) => {
    return parseFloat(rating.toFixed(1));
  };
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredReviews(profile.reviews);
    } else {
      handleCategorySelection(selectedCategory);
    }
  }, [profile.reviews]);
  const handleReviews = () => {};
  const handleBack = () => {
    navigation.goBack();
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

  // GETTING THE PROFILE DATA FOR REVIEWS
  const getProfile = async () => {
    setIsLoading(true);
    try {
      const res = await personalProfile();
      if (res.success) {
        console.log('Response of get profile:', res.data.data);
        // dispatchingAPIValues(res);
        // setReviewsList()
        setProfile(res.data.data);
        setIsLoading(false);
      } else {
        console.error('Error while getting profile:::', res.err);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('Error while getting profile:', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleCategorySelection = useCallback(
    (category: string) => {
      setSelectedCategory(category);

      const sorted = [...profile.reviews];

      if (category === 'Most Recent') {
        sorted.sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime(),
        );
      } else if (category === 'Highest Rated') {
        sorted.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
      } else if (category === 'Less Rated') {
        sorted.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
      }

      setFilteredReviews(category === 'All' ? profile.reviews : sorted);
    },
    [profile.reviews],
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={GLOBALSTYLE.container}>
      <SafeAreaView>
        <View style={GLOBALSTYLE.flex}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBack}
            hitSlop={30}>
            <Image source={backMain} style={GLOBALSTYLE.back_btn} />
          </TouchableOpacity>
          <Text style={GLOBALSTYLE.authTitle_small}>My Rating & Reviews</Text>
          <Text></Text>
        </View>
        <View style={styles.full_view}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mg_bottom_another}>
              <View style={styles.mg_vertical}>
                <View
                  style={[
                    GLOBALSTYLE.mg_top_s,
                    styles.profile_container,
                    GLOBALSTYLE.gap_s,
                  ]}>
                  <View style={GLOBALSTYLE.only_row}>
                    <Image
                      source={
                        profile.profile
                          ? {uri: profile.profile}
                          : placeholderBig
                      }
                      style={styles.profile_img}
                    />
                    <View>
                      <Text style={GLOBALSTYLE.medium_title}>
                        {profile.name}
                      </Text>
                      <Text style={GLOBALSTYLE.small_text_active}>
                        {profile.practice_name}
                      </Text>
                    </View>
                  </View>
                  <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
                    <Text style={GLOBALSTYLE.authTitle_medium}>
                      {formatRating(profile.rating)}
                    </Text>
                    <View>
                      <RatingStars rating={formatRating(profile.rating)} />
                      <Text
                        style={GLOBALSTYLE.subTitle}
                        onPress={handleReviews}>
                        {`(${
                          profile.review_count <= 1
                            ? `${profile.review_count} Review`
                            : `${profile.review_count} Reviews`
                        })`}
                      </Text>
                    </View>
                  </View>
                </View>

                {profile.reviews.length > 0 ? (
                  <>
                    <View
                      style={[GLOBALSTYLE.mg_top_s, GLOBALSTYLE.mg_bottom_xs]}>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={reviewsFilterData}
                        contentContainerStyle={styles.category_container_parent}
                        keyExtractor={item => item.id.toString()}
                        removeClippedSubviews={false}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            onPress={() => handleCategorySelection(item.filter)}
                            style={
                              item.filter === selectedCategory
                                ? styles.category_container_active
                                : styles.category_container
                            }
                            activeOpacity={0.7}>
                            <Text
                              style={
                                item.filter === selectedCategory
                                  ? GLOBALSTYLE.subTitle_white
                                  : GLOBALSTYLE.subTitle
                              }>
                              {item.filter}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>

                    <View style={[GLOBALSTYLE.mg_top_xs]}>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={profile.reviews}
                        removeClippedSubviews={false}
                        keyExtractor={item => item.candidate_id.toString()}
                        renderItem={({item}) => <MyRenderReviews item={item} />}
                      />
                    </View>
                  </>
                ) : (
                  <Text
                    style={[
                      GLOBALSTYLE.small_title,
                      GLOBALSTYLE.text_center,
                      GLOBALSTYLE.mg_top_s,
                    ]}>
                    No Review Yet
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MyRatingReviews;
