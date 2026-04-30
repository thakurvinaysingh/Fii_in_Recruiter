import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GLOBALSTYLE from '../../../../theme/GlobalStyle';
import {
  appliedCard,
  backMain,
  check,
  editImg,
  experienceCard,
  location,
  placeholderBig,
  positionCard,
} from '../../../store/ImageStore';
import {Button} from '../../../store/ComponentStore';
import {
  NativeStackNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
  useSelector,
} from '../../../store/ExternalLibrary';
import {RootState} from '../../../../redux/store/Store';
import {MainStackIF} from '../../../../types/MainStackTypes';
import {gettingOrUpdatingJobDetail} from '../../../../api/ApiServices';
import {JobIF} from '../../../../types/DataTypes';
import styles from './StyleJobDetails';
type rootProp = NativeStackNavigationProp<MainStackIF>;
type routeProp = RouteProp<MainStackIF, 'JOB_DETAILS'>;
const JobDetails = ({route}: {route: routeProp}) => {
  const navigation = useNavigation<rootProp>();
  const routes = useRoute<routeProp>();

  const jobId = routes.params.jobId;
  const [job, setJob] = useState<JobIF | null>();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state: RootState) => state.commonSlice.auth_token);
  const handleBack = () => {
    navigation.goBack();
  };

  // VIEWING OR UPDATING THE
  const getOrUpdatingJobDetail = async () => {
    setIsLoading(true);
    try {
      const res = await gettingOrUpdatingJobDetail(jobId);
      if (res.success) {
        setIsLoading(false);
        console.log('res of getting job detail:', res.data.data);
        setJob(res.data.data);
        console.log(
          'res.data.data.require_document:',
          res.data.data.require_document,
        );
      } else {
        console.log('res of getting job detailss:', res.err);
        setIsLoading(false);
      }
    } catch (err: any) {
      console.log('error in getting job detail:', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrUpdatingJobDetail();
  }, []);

  const handleApplicant = () => {
    navigation.navigate('APPLICANTS', {jobId: Number(job?.id)});
  };

  const handleEditJob = () => {
    navigation.navigate('BOTTOM_TAB', {
      screen: 'Create Job',
      params: {id: job?.id},
    });
  };
  return (
    <>
      <SafeAreaView style={GLOBALSTYLE.safeContainer}>
        {/* HEADER */}
        <View style={GLOBALSTYLE.container}>
          <View style={GLOBALSTYLE.flex}>
            <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
              <Image source={backMain} style={GLOBALSTYLE.back_btn} />
            </TouchableOpacity>
            <Text style={GLOBALSTYLE.authTitle_small}>Job Details</Text>
            {job?.is_edit ? (
              <TouchableOpacity onPress={handleEditJob} activeOpacity={0.7}>
                <Image source={editImg} style={styles.edit_img} />
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* JOB CARD */}
            <View style={styles.job_card_container}>
              <View style={styles.job_card}>
                <View style={[GLOBALSTYLE.only_row, GLOBALSTYLE.gap_m]}>
                  <Image
                    source={
                      job?.clinic_logo
                        ? {uri: job?.clinic_logo}
                        : placeholderBig
                    }
                    style={styles.clinic_img}
                  />
                  <View style={GLOBALSTYLE.gap_xs}>
                    <Text
                      style={[GLOBALSTYLE.authTitle_small, styles.text_left]}>
                      {job?.title}
                    </Text>
                    <Text style={GLOBALSTYLE.small_text_active}>
                      {/* {job?.specialization} */}
                      Should be profession
                    </Text>
                    <View style={GLOBALSTYLE.row}>
                      <Image source={location} style={styles.location_img} />
                      <Text style={[GLOBALSTYLE.small_text, {width: '78%'}]}>
                        {job?.address}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.hr_gap}>
                  <View style={GLOBALSTYLE.hr_line}></View>
                </View>
                <View style={GLOBALSTYLE.flex}>
                  <Text style={GLOBALSTYLE.small_text}>Full Time</Text>
                  <Text style={GLOBALSTYLE.small_title}>
                    ${job?.salary_range_from} - ${job?.salary_range_to}
                  </Text>
                </View>
              </View>
            </View>

            {/* EXPERIENCE - APPLIED BOXES */}
            <View style={styles.multiplebox_card}>
              <View style={styles.box}>
                <Image
                  source={experienceCard}
                  style={[styles.box_img, GLOBALSTYLE.mg_bottom_xs]}
                />
                <Text style={[GLOBALSTYLE.small_text, GLOBALSTYLE.text_center]}>
                  Experience
                </Text>
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.text_center]}>
                  {job?.experiance_level}
                </Text>
              </View>
              <View style={styles.box}>
                <Image
                  source={positionCard}
                  style={[styles.box_img, GLOBALSTYLE.mg_bottom_xs]}
                />
                <Text style={[GLOBALSTYLE.small_text, GLOBALSTYLE.text_center]}>
                  Vacancy
                </Text>
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.text_center]}>
                  {job?.vacancy}
                </Text>
              </View>
              <View style={styles.box}>
                <Image
                  source={appliedCard}
                  style={[styles.box_img, GLOBALSTYLE.mg_bottom_xs]}
                />
                <Text style={[GLOBALSTYLE.small_text, GLOBALSTYLE.text_center]}>
                  Applied
                </Text>
                <Text
                  style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.text_center]}>
                  {job?.candidates_count}
                </Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.description_area}>
              <Text
                style={[
                  GLOBALSTYLE.authTitle_small,
                  GLOBALSTYLE.mg_top_s,
                  GLOBALSTYLE.mg_bottom_xs,
                ]}>
                Description
              </Text>
              <Text style={[GLOBALSTYLE.small_text, GLOBALSTYLE.letter_space]}>
                {job?.job_description}
              </Text>
            </View>

            {/* SHIFT */}
            <View style={GLOBALSTYLE.mg_top_s}>
              <Text style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                Shifts Available
              </Text>
              <FlatList
                data={job?.shift}
                contentContainerStyle={[GLOBALSTYLE.row, {flexWrap: 'wrap'}]}
                keyExtractor={item => item}
                removeClippedSubviews={false}
                renderItem={({item}) => (
                  <View style={[styles.radius_box_white]}>
                    <Text style={[GLOBALSTYLE.small_title]}>{item}</Text>
                  </View>
                )}
              />
            </View>

            {/* SOFTWARE */}
            <View style={GLOBALSTYLE.mg_top_s}>
              <Text style={[GLOBALSTYLE.input_label, GLOBALSTYLE.mg_bottom_xs]}>
                Softwares Required
              </Text>
              <FlatList
                data={job?.software}
                contentContainerStyle={[GLOBALSTYLE.row, {flexWrap: 'wrap'}]}
                keyExtractor={item => item}
                removeClippedSubviews={false}
                renderItem={({item}) => (
                  <View style={[styles.radius_box_white]}>
                    <Text style={[GLOBALSTYLE.small_title]}>{item}</Text>
                  </View>
                )}
              />
            </View>

            {/* BENEFITS & PERKS */}
            {(job?.benefits?.length ?? 0) > 0 && (
              <View style={styles.description_area}>
                <Text
                  style={[
                    GLOBALSTYLE.authTitle_small,
                    GLOBALSTYLE.mg_top_s,
                    GLOBALSTYLE.mg_bottom_xs,
                  ]}>
                  Benefits and Perks
                </Text>
                {job?.benefits.map(item => {
                  return (
                    <View
                      style={[
                        GLOBALSTYLE.row,
                        GLOBALSTYLE.gap_xs,
                        styles.mg_top,
                      ]}>
                      <Image source={check} style={styles.check_img} />
                      <Text
                        style={[
                          GLOBALSTYLE.small_title,
                          styles.text_width,
                          GLOBALSTYLE.letter_space,
                        ]}>
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}

            <View style={[GLOBALSTYLE.mg_top_s, GLOBALSTYLE.mg_bottom_xs]}>
              {job?.candidates_count && token && (
                <Button
                  _TEXT={
                    job?.applied >= 1 ? 'View Applicants' : 'View Applicant'
                  }
                  _ONPRESS={handleApplicant}
                  _BTNSTYLE={[GLOBALSTYLE.btn_container]}
                  _TEXT_STYLE={GLOBALSTYLE.button}
                />
              )}
            </View>
            {/* <View style={[GLOBALSTYLE.mg_top_xxs, GLOBALSTYLE.mg_bottom_xs]}>
              <TransparentButton
                _IMG={chat}
                _TEXT="Start Chat"
                _HANDLEPRESS={handleChatBtn}
              />
            </View> */}
          </ScrollView>
        </View>
      </SafeAreaView>
      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}
    </>
  );
};

export default JobDetails;
