import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  AsyncStorage,
  LinearGradient,
  NativeStackNavigationProp,
  useDispatch,
  useNavigation,
  useSelector,
} from '../../../store/ExternalLibrary';
import GlobalStyle from '../../../../theme/GlobalStyle';
import {back, introImg4, next, third_active} from '../../../store/ImageStore';
import {decreaseIntroStep} from '../../../../redux/slices/CommonSlice';
import {RootState} from '../../../../redux/store/Store';
import {AuthStackParamList} from '../../../../types/AuthStack';
import GLOBALSTYLE from '../../../../theme/GlobalStyle';
import Theme from '../../../../theme/Theme';

const IntroStepThree = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthStackParamList, 'SHARED_STACK'>
    >();
  const step = useSelector((state: RootState) => state.commonSlice.intro_step);

  const handlePrevious = () => {
    if (step > 1) {
      dispatch(decreaseIntroStep());
    }
  };

  const handleNext = async () => {
    try {
      await AsyncStorage.setItem('introStep', JSON.stringify(true));
      navigation.navigate('SHARED_STACK');
    } catch (err) {
      console.log('Error while saving intro step:', err);
    }
  };
  return (
    <LinearGradient
      style={GLOBALSTYLE.just_flex}
      colors={[Theme.COLORS.DARK_BLUE, Theme.COLORS.BLUE]}
      start={{x: 0.1, y: 0.1}}
      end={{x: 0.9, y: 0.3}}>
      <SafeAreaView style={GLOBALSTYLE.just_flex}>
        <View style={GlobalStyle.container_no_space}>
          <View style={GlobalStyle.upperSection}>
            <Image source={introImg4} style={GlobalStyle.introImg} />
          </View>

          <View style={GlobalStyle.bottomSection}>
            <Text style={GlobalStyle.authTitle}>
              Reliable Connections, Effortless Results.
            </Text>
            <Text
              style={[
                GlobalStyle.subTitle,
                GlobalStyle.mg_top_xs,
                GlobalStyle.text_center,
              ]}>
              We provide a trustworthy and dependable platform that makes
              connecting easy & effective
            </Text>

            <View style={GlobalStyle.paginationContainer}>
              <TouchableOpacity activeOpacity={0.8} onPress={handlePrevious}>
                <Image source={back} style={GlobalStyle.paginationButton} />
              </TouchableOpacity>
              <Image source={third_active} style={GlobalStyle.paginationDots} />
              <TouchableOpacity activeOpacity={0.8} onPress={handleNext}>
                <Image source={next} style={GlobalStyle.paginationButton} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default IntroStepThree;
