import {axios} from '../components/store/ExternalLibrary';
import store from '../redux/store/Store';
import {BASE_URL} from '../constants/Data';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const ApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 SECONDS
  headers: {
    'Content-Type': 'application/json',
  },
});

ApiClient.interceptors.request.use(
  config => {
    const state = store?.getState();
    const authToken = state.commonSlice.auth_token;
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    config.headers['timezone'] = timezone;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default ApiClient;
