import {createNavigationContainerRef} from '@react-navigation/native';
import {MainStackIF} from './src/types/MainStackTypes';

export const navigationRef = createNavigationContainerRef<MainStackIF>();

export function navigate<RouteName extends keyof MainStackIF>(
  name: RouteName,
  params?: MainStackIF[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params);
  }
}
