import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';

const AddReview = () => {
  return (
    <View>
      <SafeAreaView>
        <Text style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.text_center]}>
          Your opinion matters!
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default AddReview;

const styles = StyleSheet.create({});
