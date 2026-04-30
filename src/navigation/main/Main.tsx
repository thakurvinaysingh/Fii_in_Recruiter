import React from 'react';
import {
  createNativeStackNavigator,
  NavigationContainer,
} from '../../components/store/ExternalLibrary';
import {navigationRef} from '../../../NavigationService';
import {
  About,
  Account,
  AllJobs,
  AllListApplicants,
  Applicants,
  CandidateProfile,
  Profile,
  MyRatingReviews,
  Notification,
  PersonalProfile,
  RatingReviews,
  ScheduledInterviews,
  ScheduleInterview,
  TabNavigator,
  PrivacyPolicy,
  AddReview,
  SearchLocation,
  Search,
  CandidateByCategories,
  SearchCandidates,
  CreateJob,
  SingleMessage,
  JobsAppliedCandidate,
  JobDetails,
  InterviewDetails,
  CandidateAppliedJobs,
} from '../../components/store/ScreenStore';

const Main = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BOTTOM_TAB" component={TabNavigator} />
        <Stack.Screen name="ALL_JOBS" component={AllJobs} />
        <Stack.Screen name="LIST_APPLICANTS" component={AllListApplicants} />
        <Stack.Screen name="NOTIFICATION" component={Notification} />
        <Stack.Screen name="APPLICANTS" component={Applicants} />
        <Stack.Screen name="ABOUT" component={About} />
        <Stack.Screen name="SEARCH" component={Search} />
        <Stack.Screen name="PRIVACY_POLICY" component={PrivacyPolicy} />
        <Stack.Screen
          name="SCHEDULED_INTERVIEWS"
          component={ScheduledInterviews}
        />
        <Stack.Screen name="PROFILE" component={Profile} />
        <Stack.Screen name="MY_RATING_REVIEWS" component={MyRatingReviews} />
        <Stack.Screen name="CANDIDATE_PROFILE" component={CandidateProfile} />
        <Stack.Screen name="SCHEDULE_INTERVIEW" component={ScheduleInterview} />
        <Stack.Screen name="RATING_REVIEWS" component={RatingReviews} />
        <Stack.Screen name="PERSONAL_PROFILE" component={PersonalProfile} />
        <Stack.Screen name="ACCOUNT" component={Account} />
        <Stack.Screen name="ADD_REVIEW" component={AddReview} />

        <Stack.Screen name="SEARCH_LOCATION" component={SearchLocation} />
        <Stack.Screen
          name="CANDIDATE_BY_CATEGORIES"
          component={CandidateByCategories}
        />
        <Stack.Screen name="SEARCHED_CANDIDATES" component={SearchCandidates} />
        <Stack.Screen name="Create Job" component={CreateJob} />
        <Stack.Screen name="SINGLE_MESSAGE" component={SingleMessage} />
        <Stack.Screen
          name="JOBS_APPLIED_CANDIDATE"
          component={JobsAppliedCandidate}
        />
        <Stack.Screen name="JOB_DETAILS" component={JobDetails} />
        <Stack.Screen name="INTERVIEW_DETAILS" component={InterviewDetails} />
        <Stack.Screen
          name="CANDIDATE_APPLIED_JOBS"
          component={CandidateAppliedJobs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
