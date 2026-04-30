import {Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RH} from '../../components/store/ExternalLibrary';
import {
  Home,
  Search,
  CreateJob,
  Messages,
  AllMessages,
} from '../../components/store/ScreenStore';
import Theme from '../../theme/Theme';
import GLOBAL_STYLE from '../../theme/GlobalStyle';
import {
  account,
  accountActive,
  chat,
  chatActive,
  createJob,
  home,
  homeActive,
  search,
  searchActive,
  work2
} from '../../components/store/ImageStore';
import {BottomTabParamList} from '../../types/BottomTabParamList';
import {AllJobs} from '../../components/store/ScreenStore';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          backgroundColor: Theme.COLORS.WHITE,
          height: Platform.OS === 'ios' ? RH(10) : RH(7.2),
        },
        tabBarLabelStyle: {
          fontFamily: Theme.FONT_FAMILY.MEDIUM,
          fontSize: RH(1.7),
          marginTop: Platform.OS === 'ios' ? RH(0.7) : RH(0.3),
        },
        tabBarActiveTintColor: Theme.COLORS.DARK_BLUE,
        tabBarInactiveTintColor: Theme.COLORS.BLACK,
        tabBarIcon: ({focused}) => {
          const icons: Record<string, any> = {
            Home: focused ? homeActive : home,
            'Create Job': createJob,
            'My Job': work2,
            Messages: focused ? chatActive : chat,
            Account: focused ? accountActive : account,
          };

          return (
            <Image source={icons[route.name]} style={GLOBAL_STYLE.tab_img} />
          );
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
    
      <Tab.Screen
        name="Create Job"
        component={CreateJob}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();

            navigation.reset({
              index: 0,
              routes: [{name: 'Create Job', params: {id: undefined}}],
            });
          },
        })}
        options={{
          tabBarStyle: {display: 'none'},
        }}
      />
      <Tab.Screen name="My Job" component={AllJobs} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
