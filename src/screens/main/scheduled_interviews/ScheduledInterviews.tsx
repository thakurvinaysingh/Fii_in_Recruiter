import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {backMain} from '../../../components/store/ImageStore';
import {
  NativeStackNavigationProp,
  useFocusEffect,
  useNavigation,
} from '../../../components/store/ExternalLibrary';
import {
  RenderInterviews,
  ToastPopup,
} from '../../../components/store/ComponentStore';
import {MainStackIF} from '../../../types/MainStackTypes';
import {gettingInterviewList} from '../../../api/ApiServices';
import {InterviewListIF} from '../../../types/DataTypes';
import {interviewStatusData} from '../../../constants/Data';
import styles from './StyleScheduledInterviews';
const ScheduledInterviews = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const [isLoading, setIsLoading] = useState(false);
  const [interviews, setInterviews] = useState<InterviewListIF[]>([]);
  const [makeProfile, setMakeProfile] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const [selectedInterviewStatus, setSelectedInterviewStatus] = useState('All');
  // GETTING ALL SCHEDULED INTERVIEW
  const getScheduledInterview = async () => {
    try {
      setIsLoading(true);
      const res = await gettingInterviewList();
      if (res.success) {
        console.log('Response of interview list:', res.data.data);
        setIsLoading(false);
        setInterviews(res.data.data);
      } else if (res.err == 'First, you must be complete Your Profile.') {
        setIsLoading(false);
        setMakeProfile(true);
      } else {
        console.log('Error in interview list:', res.err);
      }
    } catch (err: any) {
      console.error('Error in interview list in else:', err);
      setIsLoading(false);
    }
  };

  // SHOULD HIT AT FIRST RENDER
  useEffect(() => {
    getScheduledInterview();
  }, []);

  // ONLY RENDER IF THERE IS ANY CHANGE IN DETAILS
  useFocusEffect(
    useCallback(() => {
      if (shouldRefresh) {
        getScheduledInterview();
        setShouldRefresh(false); // Reset flag
      }
    }, [shouldRefresh]),
  );

  // FILTERING THE INTERVIEWS BASED ON THE STATUS SELECTED

  const filteredInterviewData = () => {
    let filtered = [...interviews];
    if (selectedInterviewStatus !== 'All') {
      filtered = filtered.filter(item => item.type === selectedInterviewStatus);
    }
    return filtered;
  };

  const handleBack = () => {
    navigation.goBack();
  };
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

  // HANDLE INTERCVIEW STATUS CATEGORY
  const handleInterviewStatusSelection = (item: string) => {
    setSelectedInterviewStatus(item);
  };
  return (
    <>
      <View style={GLOBALSTYLE.container}>
        <SafeAreaView>
          <View style={GLOBALSTYLE.flex}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
              hitSlop={30}>
              <Image source={backMain} style={GLOBALSTYLE.back_btn} />
            </TouchableOpacity>
            <Text style={GLOBALSTYLE.authTitle_small}>
              Scheduled Interviews
            </Text>
            <Text></Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={GLOBALSTYLE.mg_top_s}>
              <FlatList
                horizontal
                removeClippedSubviews={false}
                showsHorizontalScrollIndicator={false}
                data={['All', ...interviewStatusData]}
                contentContainerStyle={styles.category_container_parent}
                keyExtractor={item => item}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleInterviewStatusSelection(item)}
                    style={
                      item === selectedInterviewStatus
                        ? styles.category_container_active
                        : styles.category_container
                    }
                    activeOpacity={0.7}>
                    <Text
                      style={
                        item === selectedInterviewStatus
                          ? GLOBALSTYLE.subTitle_white
                          : GLOBALSTYLE.subTitle
                      }>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <View style={GLOBALSTYLE.mg_top_s}>
                {filteredInterviewData().length !== 0 ? (
                  <FlatList
                    data={filteredInterviewData()}
                    removeClippedSubviews={false}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                      <RenderInterviews
                        item={item}
                        onGoBack={() => setShouldRefresh(true)}
                      />
                    )}
                  />
                ) : (
                  <Text
                    style={[GLOBALSTYLE.small_title, GLOBALSTYLE.text_center]}>
                    No Interview Found
                  </Text>
                )}
              </View>
            </View>

            {/* <View style={GLOBALSTYLE.mg_top_s}>
            <Text style={GLOBALSTYLE.medium_title}>Upcoming Interviews</Text>
            <View style={GLOBALSTYLE.mg_top_s}>
              <FlatList
                data={interviewsData}
                removeClippedSubviews={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <RenderInterviews item={item} />}
              />
            </View>
          </View> */}
          </ScrollView>
        </SafeAreaView>
      </View>

      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}

      {makeProfile && (
        <ToastPopup
          _TYPE="error"
          _TEXT1="Error"
          _TEXT2="Please complete your profile first"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style_error}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
    </>
  );
};

export default ScheduledInterviews;
