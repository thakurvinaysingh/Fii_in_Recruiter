import {Image, Text, View} from 'react-native';
import React from 'react';
import {CandidateReview} from '../../../types/DataTypes';
import styles from './StyleMyRenderReviews';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  profilePlaceholder,
  starYellow,
  starYellowHalf,
} from '../../store/ImageStore';

const MyRenderReviews = ({item}: {item: CandidateReview}) => {
  const formatRating = (rating: number) => {
    return parseFloat(rating.toFixed(1));
  };

  const truncateText = (char: string, maxLength: number) => {
    return char?.length <= maxLength ? char : char?.slice(0, maxLength) + '...';
  };

  // FORMATTING THE DATE CREATED THE REVIEW
  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (diffInSeconds < 1) {
      return 'just now';
    } else if (diffInSeconds < minute) {
      const secs = diffInSeconds;
      return `${secs} ${secs === 1 ? 'second' : 'seconds'} ago`;
    } else if (diffInSeconds < hour) {
      const mins = Math.floor(diffInSeconds / minute);
      return `${mins} ${mins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < day) {
      const hrs = Math.floor(diffInSeconds / hour);
      return `${hrs} ${hrs === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < month) {
      const days = Math.floor(diffInSeconds / day);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (diffInSeconds < year) {
      const months = Math.floor(diffInSeconds / month);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffInSeconds / year);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };
  console.log('item.created:', item.created);
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
    <View style={styles.box}>
      <View style={GLOBALSTYLE.only_flex}>
        <View style={GLOBALSTYLE.only_row}>
          <View>
            <Image
              source={item.image ? {uri: item.image} : profilePlaceholder}
              style={styles.dentist_img}
            />
          </View>
          <View style={GLOBALSTYLE.gap_xs}>
            <Text style={GLOBALSTYLE.button_black}>
              {truncateText(item.candidate_name, 18)}
            </Text>
            <Text style={GLOBALSTYLE.small_text_active}>{item.profession}</Text>
            <RatingStars rating={formatRating(Number(item.rate))} />
          </View>
        </View>

        <View>
          <Text style={GLOBALSTYLE.small_text_grey}>
            {getTimeAgo(item.created)}
          </Text>
        </View>
      </View>
      <View style={GLOBALSTYLE.mg_top_xxs}>
        <Text style={GLOBALSTYLE.small_text}>{item.comment}</Text>
      </View>
    </View>
  );
};

export default MyRenderReviews;
