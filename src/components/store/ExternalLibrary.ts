import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import {
  responsiveHeight as RH,
  responsiveScreenWidth as RW,
  responsiveFontSize as RF,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector, Provider} from 'react-redux';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  useNavigation,
  NavigationContainer,
  RouteProp,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import SegmentedPicker from 'react-native-segmented-picker';
import {OtpInput} from 'react-native-otp-entry';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
// import DocumentPicker, {
//   DocumentPickerResponse,
// } from 'react-native-document-picker';
import MonthPicker from 'react-native-month-year-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import base64 from 'react-native-base64';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import RenderHtml from 'react-native-render-html';
import * as RNLocalize from 'react-native-localize';
import {getCountryCallingCode} from 'libphonenumber-js';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import DeviceInfo from 'react-native-device-info';
import notifee from '@notifee/react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import RNCalendarEvents from 'react-native-calendar-events';
export {
  RNCalendarEvents,
  statusCodes,
  GoogleSignin,
  SegmentedPicker,
  MonthPicker,
  LinearGradient,
  SplashScreen,
  RH,
  RW,
  RF,
  useDispatch,
  useSelector,
  Provider,
  useNavigation,
  createNativeStackNavigator,
  NavigationContainer,
  GooglePlacesAutocomplete,
  OtpInput,
  createBottomTabNavigator,
  DateTimePicker,
  AsyncStorage,
  ImagePicker,
  // DocumentPicker,
  RBSheet,
  axios,
  RNLocalize,
  getCountryCallingCode,
  Toast,
  base64,
  useFocusEffect,
  useRoute,
  RNFS,
  RNFetchBlob,
  RenderHtml,
  SafeAreaView,
  messaging,
  firebase,
  DeviceInfo,
  notifee,
};
export type {RouteProp};
// export type {DocumentPickerResponse};
export type {NativeStackNavigationProp};
export type {NativeStackScreenProps};
