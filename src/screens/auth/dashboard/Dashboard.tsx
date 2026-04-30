import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './StyleDashboard';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  CandidateCategories,
  CandidateProfiles,
  ToastPopup,
} from '../../../components/store/ComponentStore';
import {
  mainLogo,
  search,
  successSmall,
} from '../../../components/store/ImageStore';
import {
  NativeStackNavigationProp,
  useNavigation,
  useSelector,
  SafeAreaView,
  axios,
  LinearGradient,
} from '../../../components/store/ExternalLibrary';
import {RootState} from '../../../redux/store/Store';
import {AuthStackParamList} from '../../../types/AuthStack';
import {SharedStackIF} from '../../../SharedStackTypes';
import {CandidateIF, CategoryIF} from '../../../types/DataTypes';
type rootProp = NativeStackNavigationProp<AuthStackParamList>;
type sharedProp = NativeStackNavigationProp<SharedStackIF>;
const Dashboard = () => {
  const [category, setCategory] = useState<CategoryIF[]>([]);
  const [candidate, setCandidate] = useState<CandidateIF[]>([]);

  const navigation = useNavigation<rootProp>();
  const sharedNavigation = useNavigation<sharedProp>();

  const {isUnsavedSuccess, isSavedSuccess, isLogoutSuccess, auth_token} =
    useSelector((state: RootState) => state.commonSlice);

  const handleProfile = () => Alert.alert('Under Development...');
  const handleNotification = () => Alert.alert('Under Development...');
  const handleSearch = () => sharedNavigation.navigate('SEARCH');
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        'https://fillin-admin.cyberxinfosolution.com/api/dashboard',
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status == 200) {
        setCategory(response.data.data.specialization);
        setCandidate(response.data.data.candidate);
      } else {
        console.error('Error in fetch dashboard:', response.data);
      }
    } catch (err: any) {
      console.log('Error in dashboard:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRegisterPress = () => {
    navigation.navigate('REGISTER');
  };

  const handleLogin = () => {
    navigation.navigate('LOGIN');
  };
  const renderHeader = () => (
    <>
      {/* Top bar */}
      <View style={GLOBALSTYLE.flex}>
        <TouchableOpacity onPress={handleProfile} />
        <Image source={mainLogo} style={styles.main_logo} />
        <TouchableOpacity onPress={handleNotification}>
          {/* <Image style={styles.notification_img} /> */}
        </TouchableOpacity>
      </View>

      <View style={styles.container_bg}>
        <Text style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.text_center]}>
          Find Your Dream Candidate!
        </Text>
        {/* <Text
          style={[
            GLOBALSTYLE.subTitleActive,
            GLOBALSTYLE.mg_top_xxs,
            GLOBALSTYLE.text_center,
          ]}>
          Create Your Account
        </Text> */}
        <View style={GLOBALSTYLE.gap_m}>
          <View
            style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s, GLOBALSTYLE.mg_top_xs]}>
            <Image source={successSmall} style={styles.sucess_img} />
            <Text style={GLOBALSTYLE.small_text}>
              100% Qualified Dental Candidate
            </Text>
          </View>
          <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
            <Image source={successSmall} style={styles.sucess_img} />
            <Text style={GLOBALSTYLE.small_text}>
              Dental Assistant Modern Dental Care
            </Text>
          </View>

          <View style={[GLOBALSTYLE.row, GLOBALSTYLE.gap_s]}>
            <Image source={successSmall} style={styles.sucess_img} />
            <Text style={GLOBALSTYLE.small_text}>
              All Candidate Provide You Best Location
            </Text>
          </View>
        </View>
        <View style={[GLOBALSTYLE.flex, GLOBALSTYLE.mg_top_s]}>
          <LinearGradient
            colors={['#0052DB', '#81efe3']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}>
            <TouchableOpacity
              onPress={handleLogin}
              style={styles.btn_container}
              activeOpacity={0.7}>
              <Text style={styles.text_login}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity
            onPress={handleRegisterPress}
            style={styles.btn_container_transparent}
            activeOpacity={0.7}>
            <Text style={styles.text_register}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <TouchableOpacity
        onPress={handleSearch}
        activeOpacity={0.9}
        style={[
          styles.search_container,
          GLOBALSTYLE.mg_top_s,
          GLOBALSTYLE.mg_bottom_xs,
        ]}>
        <Image source={search} style={styles.search_img} />
        <Text style={GLOBALSTYLE.small_text}>Find Candidates</Text>
      </TouchableOpacity>

      {/* Categories */}
      {category.length > 0 && (
        <View style={GLOBALSTYLE.mg_top_xs}>
          <Text style={GLOBALSTYLE.button_black}>Candidates By Categories</Text>
          <View style={[GLOBALSTYLE.mg_top_xs, GLOBALSTYLE.flex]}>
            <FlatList
              data={category}
              numColumns={2}
              removeClippedSubviews={false}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              renderItem={({item}) => <CandidateCategories item={item} />}
            />
          </View>
        </View>
      )}

      {/* Section title */}
      {/* {candidate.length > 0 && (
        <View style={[GLOBALSTYLE.flex, GLOBALSTYLE.mg_top_xs]}>
          <Text style={[GLOBALSTYLE.button_black, GLOBALSTYLE.mg_bottom_xs]}>
            Suggested Candidates For You
          </Text>
        </View>
      )} */}
    </>
  );

  return (
    <>
      <SafeAreaView
        style={GLOBALSTYLE.safeContainer}
        edges={['top', 'left', 'right']}>
        <View style={[GLOBALSTYLE.container_jobs]}>
          <FlatList
            data={candidate}
            removeClippedSubviews={false}
            keyExtractor={item => item.id.toString()}
            // renderItem={({item}) => <CandidateProfiles item={item} />}
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>

      {/* Toasts */}
      {isUnsavedSuccess && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Job unsaved successfully"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
      {isSavedSuccess && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Job saved successfully"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}

      {isLogoutSuccess && (
        <ToastPopup
          _TYPE="success"
          _TEXT1="Success"
          _TEXT2="Logged Out Successfully!"
          _TEXT1_STYLE={GLOBALSTYLE.tost_text1_style}
          _TEXT2_STYLE={GLOBALSTYLE.tost_text2_style}
          _TIME={3000}
        />
      )}
    </>
  );
};

export default Dashboard;
