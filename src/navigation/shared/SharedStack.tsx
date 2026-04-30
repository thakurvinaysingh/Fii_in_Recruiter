import React from 'react';
import {createNativeStackNavigator} from '../../components/store/ExternalLibrary';
import {
  CandidateByCategories,
  CandidateProfile,
  RatingReviews,
  Search,
} from '../../components/store/ScreenStore';
import Dashboard from '../../screens/auth/dashboard/Dashboard';
import SearchedCandidates from '../../screens/shared/searched_candidates/SearchedCandidates';

const SharedStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DASHBOARD" component={Dashboard} />
      <Stack.Screen name="CANDIDATE_PROFILE" component={CandidateProfile} />
      <Stack.Screen name="RATING_REVIEWS" component={RatingReviews} />
      <Stack.Screen name="SEARCH" component={Search} />
      <Stack.Screen
        name="CANDIDATE_BY_CATEGORIES"
        component={CandidateByCategories}
      />
      <Stack.Screen name="SEARCHED_CANDIDATES" component={SearchedCandidates} />
    </Stack.Navigator>
  );
};

export default SharedStack;
