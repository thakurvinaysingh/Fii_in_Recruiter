import {useEffect, useState} from 'react';
import {
  AsyncStorage,
  createNativeStackNavigator,
  NavigationContainer,
} from '../../components/store/ExternalLibrary';
import {
  ChangePass,
  ForgotPass,
  IntroSlider,
  Login,
  OTPVerification,
  Register,
  SharedStack,
} from '../../components/store/ScreenStore';
import {AuthStackParamList} from '../../types/AuthStack';
import SearchedCandidates from '../../screens/shared/searched_candidates/SearchedCandidates';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const Auth = () => {
  const [isIntroCompleted, setIsIntroCompleted] = useState<boolean | null>(null);
  useEffect(() => {
    const gettingIntroStep = async () => {
      try {
        const introCompleted = await AsyncStorage.getItem('introStep');
        setIsIntroCompleted(introCompleted === 'true');
        console.log('introCompleted:', introCompleted);
      } catch (err) {
        console.log('Error while getting the intro step');
        setIsIntroCompleted(false);
      }
    };
    gettingIntroStep();
  }, []);

  if (isIntroCompleted === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isIntroCompleted && (
          <Stack.Screen name="INTRO_SLIDER" component={IntroSlider} />
        )}
        <Stack.Screen name="SHARED_STACK" component={SharedStack} />
        <Stack.Screen name="LOGIN" component={Login} />
        <Stack.Screen name="REGISTER" component={Register} />
        <Stack.Screen name="FORGOT_PASS" component={ForgotPass} />
        <Stack.Screen name="OTP_VERIFICATION" component={OTPVerification} />
        <Stack.Screen name="CHANGE_PASS" component={ChangePass} />
        <Stack.Screen
          name="SEARCHED_CANDIDATES"
          component={SearchedCandidates}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Auth;
