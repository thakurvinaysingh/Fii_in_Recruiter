import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ApplicantsByIdIF} from '../../types/DataTypes';
import styles from './StyleRenderApplicants';
import GLOBALSTYLE from '../../theme/GlobalStyle';
import {
  NativeStackNavigationProp,
  useNavigation,
} from '../../components/store/ExternalLibrary';
import {MainStackIF} from '../../types/MainStackTypes';
import {placeholderBig} from '../store/ImageStore';

const RenderApplicants = ({
  item,
  jobId,
}: {
  item: ApplicantsByIdIF;
  jobId: number;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const handleProfile = () => {
    navigation.navigate('CANDIDATE_PROFILE', {candidateId: item.id, jobId});
  };

  const trucateString = (char: string, length: number) => {
    return char.length <= length ? char : char.slice(0, length) + '...';
  };

  return (
    <TouchableOpacity
      style={styles.box}
      activeOpacity={0.7}
      onPress={handleProfile}>
      <View style={GLOBALSTYLE.flex}>
        <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_m]}>
          <Image
            source={item.profile ? {uri: item.profile} : placeholderBig}
            style={styles.profile_img}
          />
          <View style={GLOBALSTYLE.gap_xs}>
            <Text style={GLOBALSTYLE.small_title}>
              {trucateString(item.name, Platform.OS === 'ios' ? 19 : 22)}
            </Text>
            <Text style={GLOBALSTYLE.small_text_active}>{item.profession}</Text>
            <Text style={GLOBALSTYLE.small_text}>
              {item.year_of_experiance}
            </Text>
          </View>
        </View>

        {item.applied_track.slice(-1).map(status => {
          return (
            <View
              style={
                status === 'Application Sent'
                  ? styles.status_box_yellow
                  : status === 'Application Viewed'
                  ? styles.status_box_green
                  : status === 'Interview Scheduled'
                  ? styles.status_box_blue
                  : styles.status_box_yellow
              }>
              <Text
                style={
                  status === 'Application Sent'
                    ? styles.small_text_yellow
                    : status === 'Application Viewed'
                    ? styles.small_text_green
                    : status === 'Interview Scheduled'
                    ? styles.small_text_blue
                    : styles.small_text_yellow
                }>
                {trucateString(
                  status.charAt(0).toUpperCase() + status.slice(1),
                  15,
                )}
              </Text>
            </View>
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

export default RenderApplicants;
