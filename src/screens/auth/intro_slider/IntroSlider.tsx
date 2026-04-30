import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {
  IntroStepFour,
  IntroStepOne,
  IntroStepThree,
  IntroStepTwo,
} from '../../../components/store/ComponentStore';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/Store';

const IntroSlider = () => {
  const step = useSelector((state: RootState) => state.commonSlice.intro_step);
  return (
    <>
      {step === 1 ? (
        <IntroStepOne />
      ) : step === 2 ? (
        <IntroStepTwo />
      ) : step === 3 ? (
        <IntroStepThree />
      ) : (
        <Text>Invalid Component</Text>
      )}
    </>
  );
};

export default IntroSlider;

const styles = StyleSheet.create({});
