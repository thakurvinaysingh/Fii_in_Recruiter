import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {
  NativeStackNavigationProp,
  useNavigation,
  RenderHtml,
} from '../../../components/store/ExternalLibrary';
import {backMain} from '../../../components/store/ImageStore';
import {MainStackIF} from '../../../types/MainStackTypes';
import {gettingSettingsData} from '../../../api/ApiServices';

const PrivacyPolicy = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackIF>>();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{privacy_policy: string}>({
    privacy_policy: '',
  });
  const handleBack = () => {
    navigation.goBack();
  };

  //   GETTING HTML DATA FOR PRIVACY POLICY
  const getSettingData = async () => {
    try {
      setIsLoading(true);
      const res = await gettingSettingsData();
      if (res.success) {
        console.log('res of about us data:', res.data.data);
        setData({privacy_policy: res.data.data.privacy_policy});
      } else {
        console.warn('Error in about us api:', res.err);
      }
    } catch (err: any) {
      console.error('Error in about us api:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSettingData();
  }, []);

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
            <Text style={GLOBALSTYLE.authTitle_small}>Privacy Policy</Text>
            <Text></Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={GLOBALSTYLE.mg_top_s}>
            <View style={{}}>
              {data.privacy_policy ? (
                <RenderHtml
                  contentWidth={10}
                  source={{html: data.privacy_policy}}
                  baseStyle={{
                    fontSize: 16,
                    lineHeight: 24,
                    color: '#333',
                    paddingHorizontal: 16,
                  }}
                />
              ) : (
                <Text
                  style={[GLOBALSTYLE.small_title, GLOBALSTYLE.text_center]}>
                  No content available
                </Text>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>

      {isLoading && (
        <View style={GLOBALSTYLE.activity_indicator_container}>
          <ActivityIndicator size="large" color="#0165fc" />
        </View>
      )}
    </>
  );
};

export default PrivacyPolicy;
