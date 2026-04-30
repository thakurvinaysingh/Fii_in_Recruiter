import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {JobType} from '../../../types/DataTypes';
import styles from './StylePostedJobs';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  applicants,
  deleteIcon,
  exp,
  history,
  location,
  profilePlaceholder,
  work,
} from '../../store/ImageStore';
import {Button} from '../../store/ComponentStore';
import {
  NativeStackNavigationProp,
  useNavigation,
  useSelector,
} from '../../store/ExternalLibrary';
import {MainStackIF} from '../../../types/MainStackTypes';
import {RootState} from '../../../redux/store/Store';
const PostedJobs = ({
  item,
  handleDeleteJob,
  candidateId,
}: {
  item: JobType;
  handleDeleteJob: (id: number) => void;
  candidateId?: number;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  // CALCULATING THE FRESHNESS OF JOBS IN FORMATTED WAY
  const {isCandidateAppliedJobsViewing} = useSelector(
    (state: RootState) => state.commonSlice,
  );
  const calculateJobFreshness = (createdAt?: string): string => {
    if (!createdAt) return 'Unknown';

    try {
      const jobDate = new Date(createdAt);
      const currentDate = new Date();
      const diffMS = currentDate.getTime() - jobDate.getTime();
      const diffMins = Math.floor(diffMS / 60000);

      if (diffMins < 1) return 'Just now';
      if (diffMins === 1) return '1 min ago';
      if (diffMins < 60) return `${diffMins} mins ago`;

      const diffHours = Math.floor(diffMins / 60);
      if (diffHours === 1) return '1 hour ago';
      if (diffHours < 24) return `${diffHours} hours ago`;

      const diffDays = Math.floor(diffMins / 1440);
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 30) return `${diffDays} days ago`;

      const diffMonths = Math.floor(diffDays / 30);
      if (diffMonths === 1) return '1 month ago';
      if (diffMonths === 2) return '2 months ago';
      if (diffMonths === 3) return '3 months ago';
      return '3+ months ago';
    } catch (error) {
      console.error('Error calculating freshness:', error);
      return 'Invalid date';
    }
  };

  // SHOWING THE ... IF TEXT IS BIGGER THAN EXPECTED
  const truncateText = (text: string, maxLength: number) => {
    if (text?.length <= maxLength) return text;
    return text?.slice(0, maxLength) + '...';
  };

  const handleViewDetail = () => {
    // navigation.navigate('BOTTOM_TAB', {
    //   screen: "",
    //   params: {id: item.id},
    // });
    if (isCandidateAppliedJobsViewing) {
      navigation.navigate('SCHEDULE_INTERVIEW', {
        jobId: item.id,
        candidateId: Number(candidateId),
      });
    } else {
      navigation.navigate('JOB_DETAILS', {jobId: item.id});
    }
  };

  // HANLDE APPLICANTS NAVIGATION
  const handleApplicants = (jobId: number) => {
    if (item.candidates_count !== 0) navigation.navigate('APPLICANTS', {jobId});
  };
  return (
    <>
      <View style={styles.box}>
        <View style={[GLOBALSTYLE.row_flat, GLOBALSTYLE.gap_s]}>
          {item.clinic_logo ? (
            <Image source={{uri: item.clinic_logo}} style={styles.img} />
          ) : (
            <Image source={profilePlaceholder} style={styles.img} />
          )}
          <View style={GLOBALSTYLE.gap_s}>
            <Text style={GLOBALSTYLE.button_black}>
              {truncateText(item.title, 29)}
            </Text>

            <Text style={GLOBALSTYLE.small_text_active}>{item.clinic}</Text>
            <View style={GLOBALSTYLE.row}>
              <View style={GLOBALSTYLE.row}>
                <Image source={location} style={styles.small_img} />
                <Text style={[GLOBALSTYLE.small_text, styles.space]}>
                  {truncateText(item.address, 13)}
                </Text>
              </View>
              <View style={GLOBALSTYLE.row}>
                <Image style={styles.small_img} source={work} />

                {/* PROFESSION */}
                {/* <Text style={[GLOBALSTYLE.small_text, styles.space]}>
                  {(() => {
                    const types = item?.profession ?? [];
                    if (types.length === 0) return '';
                    if (types.length === 1) return types[0]?.key;
                    return `${types[0]?.key} +${types.length - 1}`;
                  })()}
                </Text> */}

                {/* NOW SALARY */}
                <Text style={[GLOBALSTYLE.small_text, styles.space]}>
                  {item.salary_range_from}-{item.salary_range_to}/hour
                </Text>
              </View>
            </View>
            <View style={GLOBALSTYLE.row}>
              <View style={GLOBALSTYLE.row}>
                <Image source={history} style={styles.small_img} />
                <Text style={[GLOBALSTYLE.small_text, styles.space]}>
                  {calculateJobFreshness(item.created_at)}
                </Text>
              </View>
              <View style={GLOBALSTYLE.row}>
                <Image source={exp} style={styles.small_img} />
                <Text style={[GLOBALSTYLE.small_text, styles.space]}>
                  {item.experiance_level}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            GLOBALSTYLE.hr_line,
            GLOBALSTYLE.mg_top_xs,
            GLOBALSTYLE.mg_bottom_xs,
          ]}></View>

        <View style={GLOBALSTYLE.flex}>
          <TouchableOpacity
            hitSlop={20}
            style={GLOBALSTYLE.row}
            onPress={() => handleApplicants(item.id)}>
            <Image source={applicants} style={styles.small_img2} />
            <Text
              style={[
                item.candidates_count <= 0
                  ? GLOBALSTYLE.small_text
                  : GLOBALSTYLE.small_text_active,
              ]}>
              {`${item.candidates_count} ${
                item.candidates_count <= 1 ? 'Applicant' : 'Applicants'
              }`}
            </Text>
          </TouchableOpacity>
          <View>
            <Button
              _TEXT={
                isCandidateAppliedJobsViewing
                  ? 'Schedule Interview'
                  : 'View Details'
              }
              _ONPRESS={handleViewDetail}
              _TEXT_STYLE={GLOBALSTYLE.button_small}
              _BTNSTYLE={GLOBALSTYLE.btn_container_small}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.delete_view}
          activeOpacity={0.8}
          hitSlop={30}
          onPress={() => handleDeleteJob(item.id)}>
          <Image source={deleteIcon} style={styles.small_img1} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PostedJobs;
