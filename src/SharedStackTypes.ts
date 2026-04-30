import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type SharedStackIF = {
  DASHBOARD: undefined;
  CANDIDATE_PROFILE: undefined;
  RATING_REVIEWS: undefined;
  SEARCH: undefined;
  CANDIDATE_BY_CATEGORIES: {categoryId: number[]};
  SEARCHED_CANDIDATES: {
    searchText: string;
    location: string;
    latitude: string;
    longitude: string;
  };
};

export type AuthScreenProps = NativeStackScreenProps<SharedStackIF>;
