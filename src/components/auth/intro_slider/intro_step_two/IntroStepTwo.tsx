import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  LinearGradient,
  useDispatch,
  useSelector,
} from '../../../store/ExternalLibrary';
import GlobalStyle from '../../../../theme/GlobalStyle';
import {back, introImg3, next, second_active} from '../../../store/ImageStore';
import {
  decreaseIntroStep,
  increaseIntroStep,
} from '../../../../redux/slices/CommonSlice';
import {RootState} from '../../../../redux/store/Store';
import GLOBALSTYLE from '../../../../theme/GlobalStyle';
import Theme from '../../../../theme/Theme';

const IntroStepTwo = () => {
  const dispatch = useDispatch();

  const step = useSelector((state: RootState) => state.commonSlice.intro_step);
  const handlePrevious = () => {
    if (step > 1) {
      dispatch(decreaseIntroStep());
    }
  };

  const handleNext = () => {
    dispatch(increaseIntroStep());
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
            <Image source={introImg3} style={GlobalStyle.introImg} />
          </View>

          <View style={GlobalStyle.bottomSection}>
            <Text style={GlobalStyle.authTitle}>
              Connecting the Right People, Saving Time.
            </Text>
            <Text
              style={[
                GlobalStyle.subTitle,
                GLOBALSTYLE.mg_top_xs,
                GlobalStyle.text_center,
              ]}>
              We’re all about saving time—by showing practices the most suitable
              Dental Professionals and dental staff the ideal job opportunities
            </Text>

            <View style={GlobalStyle.paginationContainer}>
              <TouchableOpacity activeOpacity={0.8} onPress={handlePrevious}>
                <Image source={back} style={GlobalStyle.paginationButton} />
              </TouchableOpacity>
              <Image
                source={second_active}
                style={GlobalStyle.paginationDots}
              />
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

export default IntroStepTwo;
