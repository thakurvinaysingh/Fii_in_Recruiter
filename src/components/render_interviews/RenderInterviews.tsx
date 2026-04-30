import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {InterviewListIF} from '../../types/DataTypes';
import styles from './StyleRenderInterviews';
import GLOBALSTYLE from '../../theme/GlobalStyle';
import {accountSmall, history} from '../store/ImageStore';
import {Button} from '../store/ComponentStore';
import {
  NativeStackNavigationProp,
  useNavigation,
} from '../../components/store/ExternalLibrary';
import {MainStackIF} from '../../types/MainStackTypes';
type navigationProp = NativeStackNavigationProp<MainStackIF>;
const RenderInterviews = ({
  item,
  onGoBack,
}: {
  item: InterviewListIF;
  onGoBack?: () => void;
}) => {
  const navigation = useNavigation<navigationProp>();
  const [interviewType, setInterviewType] = useState(item.type);
  const convertTo12HourFormat = (time24: string): string => {
    const [hourStr, minuteStr] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12 || 12;

    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    const formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;

    return `${formattedHour}:${formattedMinute} ${ampm}`;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text?.length <= maxLength) return text;
    return text?.slice(0, maxLength) + '...';
  };

  const formatDate = (dateString: string): string => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const [year, month, day] = dateString.split('-');
    const monthName = months[parseInt(month, 10) - 1];

    return `${parseInt(day)} ${monthName} ${year}`;
  };

  const handleInterviewDetails = () => {
    navigation.navigate('INTERVIEW_DETAILS', {id: item.id, onGoBack: onGoBack});
  };

  const handleJoinInterview = () => {
    Linking.openURL(item.link);
  };
  return (
    <>
      <TouchableOpacity
        style={styles.box}
        activeOpacity={0.7}
        onPress={handleInterviewDetails}>
        <View style={GLOBALSTYLE.flex}>
          <View style={[GLOBALSTYLE.gap_xs, styles.full_width]}>
            <View style={[GLOBALSTYLE.flex]}>
              <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_xs]}>
                <Image source={history} style={styles.history_img} />
                <Text style={GLOBALSTYLE.small_text_grey}>
                  {formatDate(item.date)} &nbsp;
                </Text>

                <Text style={GLOBALSTYLE.small_text_grey}>
                  {convertTo12HourFormat(item.time)}
                </Text>
              </View>
              <View
                style={
                  interviewType === 'Completed'
                    ? styles.status_box_green
                    : interviewType === 'Upcoming'
                    ? styles.status_box_blue
                    : interviewType === 'Today'
                    ? styles.status_box_yellow
                    : styles.status_box_red
                }>
                <Text
                  style={
                    interviewType === 'Completed'
                      ? styles.small_text_green
                      : interviewType === 'Upcoming'
                      ? styles.small_text_blue
                      : interviewType === 'Today'
                      ? styles.small_text_yellow
                      : styles.small_text_red
                  }>
                  {interviewType}
                </Text>
              </View>
            </View>
            <Text style={GLOBALSTYLE.small_title}>
              {truncateText(item.title, 55)}
            </Text>
            <Text style={GLOBALSTYLE.small_title}>
              {truncateText(item.job_name, 55)}
            </Text>

            <Text style={GLOBALSTYLE.small_text_active}>
              {item.candidate_profession}
            </Text>
            <View style={[GLOBALSTYLE.flex, GLOBALSTYLE.gap_s]}>
              <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_xs]}>
                <Image
                  source={item.profile ? {uri: item.profile} : accountSmall}
                  style={styles.history_img}
                />
                <Text style={GLOBALSTYLE.small_text}>
                  {truncateText(item.candidate, 20)}
                </Text>
              </View>
              {item.type !== 'Completed' && item.type !== 'Expired' && (
                <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_xs]}>
                  <Button
                    _TEXT="Join Meeting"
                    _ONPRESS={handleJoinInterview}
                    _TEXT_STYLE={GLOBALSTYLE.button_small}
                    _BTNSTYLE={GLOBALSTYLE.btn_container_small}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default RenderInterviews;
