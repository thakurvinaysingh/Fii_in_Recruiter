import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

// Define Bottom Tab Navigator types
export type BottomTabParamList = {
  BOTTOM_TAB: undefined;
  Home: undefined;
  Search: undefined;
  'Create Job': {id: number | undefined | string};
  Messages: {id: number};
  Account: undefined;
  AllMessages: undefined;
};

// Type for navigation in Tab Screens
export type BottomTabNavigationProps<T extends keyof BottomTabParamList> =
  BottomTabNavigationProp<BottomTabParamList, T>;
