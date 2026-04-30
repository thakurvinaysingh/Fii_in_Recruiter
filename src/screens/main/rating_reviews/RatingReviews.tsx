import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  backMain,
  placeholderBig,
  profilePlaceholder,
  starYellow,
  starYellowHalf,
} from '../../../components/store/ImageStore';
import {
  NativeStackNavigationProp,
  useNavigation,
  RouteProp,
  useRoute,
} from '../../../components/store/ExternalLibrary';
import {MainStackIF} from '../../../types/MainStackTypes';
import styles from './StyleRatingReviews';
import {reviewsFilterData} from '../../../constants/Data';
import {RenderReviews} from '../../../components/store/ComponentStore';
type RouteType = RouteProp<MainStackIF, 'RATING_REVIEWS'>;
const RatingReviews = () => {
  const routes = useRoute<RouteType>();
  const params = routes.params;
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const handleBack = () => {
    navigation.goBack();
  };
  const [filteredReviews, setFilteredReviews] = useState(params.reviews);
  const handleReviews = () => {
    // navigation.navigate('RATING_REVIEWS', {});
  };

  const formatRating = (rating: number) => {
    return parseFloat(rating.toFixed(1));
  };

  const handleCategorySelection = useCallback(
    (category: string) => {
      setSelectedCategory(category);

      const sorted = [...params.reviews];

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

      setFilteredReviews(category === 'All' ? params.reviews : sorted);
    },
    [params.reviews],
  );
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
          <View style={[GLOBALSTYLE.flex]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
              hitSlop={30}>
              <Image source={backMain} style={GLOBALSTYLE.back_btn} />
            </TouchableOpacity>
            <Text style={GLOBALSTYLE.authTitle_small}>Rating & Reviews</Text>
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
                          params.profile
                            ? {uri: params.profile}
                            : placeholderBig
                        }
                        style={styles.profile_img}
                      />
                      <View>
                        <Text style={GLOBALSTYLE.medium_title}>
                          {params.name}
                        </Text>
                        <Text style={GLOBALSTYLE.small_text_active}>
                          {params.profession}
                        </Text>
                      </View>
                    </View>
                    <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
                      <Text style={GLOBALSTYLE.authTitle_medium}>
                        {formatRating(params.rating)}
                      </Text>
                      <View>
                        <RatingStars rating={formatRating(params.rating)} />
                        <Text
                          style={GLOBALSTYLE.subTitle}
                          onPress={handleReviews}>
                          {`(${
                            params.reviewCount <= 1
                              ? `${params.reviewCount} Review`
                              : `${params.reviewCount} Reviews`
                          })`}
                        </Text>
                      </View>
                    </View>
                  </View>

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
                      data={filteredReviews}
                      removeClippedSubviews={false}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => <RenderReviews item={item} />}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default RatingReviews;
