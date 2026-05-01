/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {messaging} from './src/components/store/ExternalLibrary';
import 'react-native-get-random-values';

// Register background handler. Wrapped in try/catch so that any failure to
// initialise Firebase Messaging (e.g. missing google-services.json fields,
// Play Services not available on the device) does NOT prevent the app
// component from registering. Without this guard, a throw here leaves the
// native splash screen covering the entire UI with no visible error.
try {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
} catch (e) {
  console.warn('Firebase messaging background handler setup failed:', e);
}

AppRegistry.registerComponent(appName, () => App);
