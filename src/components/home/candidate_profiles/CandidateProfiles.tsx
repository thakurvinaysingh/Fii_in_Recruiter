import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CandidateIF} from '../../../types/DataTypes';
import styles from './StyleRecentApplicants';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  bag,
  location,
  roundProfilePlaceholder,
  starYellow,
  starYellowHalf,
} from '../../store/ImageStore';
import {
  NativeStackNavigationProp,
  useNavigation,
} from '../../store/ExternalLibrary';
import {MainStackIF} from '../../../types/MainStackTypes';
type navigationType = NativeStackNavigationProp<MainStackIF>;
const CandidateProfiles = ({item}: {item: CandidateIF}) => {
  const navigation = useNavigation<navigationType>();
  const handleViewDetail = () => {
    navigation.navigate('CANDIDATE_PROFILE', {candidateId: item.id});
  };

  const formatRating = (rating: number) => {
    return parseFloat(rating?.toFixed(1));
  };

  // TRUNCATING STRING AND SHOWING ...
  const truncateStr = (str: string, maxLength: number) => {
    return str.length < maxLength ? str : str.slice(0, maxLength) + '...';
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
  return (
    <TouchableOpacity
      style={styles.box}
      onPress={handleViewDetail}
      activeOpacity={0.7}>
      <View style={[GLOBALSTYLE.only_row, GLOBALSTYLE.gap_s]}>
        <Image
          source={item.profile ? {uri: item.profile} : roundProfilePlaceholder}
          style={styles.profile_img}
        />
        <View style={GLOBALSTYLE.gap_xs}>
          <Text style={[GLOBALSTYLE.medium_title]}>
            {truncateStr(item.name, 24)}
          </Text>
          <Text style={[GLOBALSTYLE.subTitle_active]}>{item.profession}</Text>

          <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
            <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_xs]}>
              <Image source={bag} style={styles.small_img} />
              <Text style={[GLOBALSTYLE.subTitle, styles.mg_right]}>
                {item.year_of_experiance ? item.year_of_experiance : 'NA'}
              </Text>
            </View>

            <View style={GLOBALSTYLE.row}>
              <Image source={location} style={styles.small_img} />
              <Text style={[GLOBALSTYLE.subTitle, styles.mg_right]}>
                {item.location ? truncateStr(item.location, 15) : 'Not Found'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[GLOBALSTYLE.mg_top_s, GLOBALSTYLE.flex]}>
        {/* RAITNG */}
        <View style={GLOBALSTYLE.row}>
          <RatingStars rating={formatRating(item.rating)} />
          <Text style={GLOBALSTYLE.subTitle}>
            {formatRating(item.rating)}{' '}
            {`(${
              item.review_count <= 1
                ? `${item.review_count} Review`
                : `${item.review_count} Reviews`
            })`}
          </Text>
        </View>

        {/* PRICE */}
        <View style={[GLOBALSTYLE.flex, GLOBALSTYLE.mg_top_xxs]}>
          <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_xs]}>
            <Text style={GLOBALSTYLE.small_title_bigger_active}>
              {item.hourly_rate === 'Flexible on Pay'
                ? item.hourly_rate
                : !item.hourly_rate
                ? 'NA'
                : `$${item.hourly_rate}/hour`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CandidateProfiles;
