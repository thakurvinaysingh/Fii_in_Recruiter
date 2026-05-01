import {NativeStackScreenProps} from '../components/store/ExternalLibrary';
import {BottomTabParamList} from './BottomTabParamList';
import {ReviewsIF} from './DataTypes';
export type MainStackIF = {
  BOTTOM_TAB: {
    screen?: keyof BottomTabParamList;
    params?: BottomTabParamList[keyof BottomTabParamList];
  };
  ALL_JOBS: {comeFrom?: string};
  LIST_APPLICANTS: {comeFrom?: string};
  JOBS_APPLIED_CANDIDATE: undefined;
  NOTIFICATION: undefined;
  APPLICANTS: {jobId: number};
  ABOUT: undefined;
  PRIVACY_POLICY: undefined;
  SCHEDULED_INTERVIEWS: undefined;
  PROFILE: {comeFrom?: string};
  MY_RATING_REVIEWS: undefined;
  SEARCH: undefined;
  CANDIDATE_PROFILE: {candidateId: number; jobId: number};
  SCHEDULE_INTERVIEW: {candidateId: number; id?: number; jobId?: number};
  INTERVIEW_CALENDAR: {
    candidateId: number;
    jobId?: number;
    interviewId?: number; // PASSED IF RESCHEDULING AN EXISTING INTERVIEW
  };
  RATING_REVIEWS: {
    name: string;
    profession: string;
    rating: number;
    reviewCount: number;
    reviews: ReviewsIF[];
    profile: string;
  };
  PERSONAL_PROFILE: undefined;
  ACCOUNT: undefined;
  ADD_REVIEW: undefined;
  SEARCH_LOCATION: undefined;
  CANDIDATE_BY_CATEGORIES: {categoryId: number[]};
  SEARCHED_CANDIDATES: {
    searchText: string;
    location: string;
    latitude: string;
    longitude: string;
  };

  SINGLE_MESSAGE: {
    candidateId: number;
    candidateName: string;
    candidateProfile: string;
  };
  JOB_DETAILS: {jobId: number};
  INTERVIEW_DETAILS: {id: number; onGoBack?: () => void};
  CANDIDATE_APPLIED_JOBS: {id: number};
};

export type MainScreenProp = NativeStackScreenProps<MainStackIF>;
