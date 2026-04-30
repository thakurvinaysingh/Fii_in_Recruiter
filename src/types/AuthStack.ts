import {NativeStackScreenProps} from '../components/store/ExternalLibrary';

export type AuthStackParamList = {
  INTRO_SLIDER: undefined;
  LOGIN: undefined;
  REGISTER: undefined;
  FORGOT_PASS: undefined;
  OTP_VERIFICATION: {emailInput: string; fromForgot: boolean};
  CHANGE_PASS: {emailInput: string};
  SHARED_STACK: undefined;
  SEARCHED_CANDIDATES: {
    searchText: string;
    location: string;
    latitude: string;
    longitude: string;
  };
};

export type AuthScreenProps = NativeStackScreenProps<AuthStackParamList>;
