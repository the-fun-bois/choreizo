import axios from 'axios';
import { SERVER_URL, REACT_ENV, USER_ID } from 'react-native-dotenv';
import * as SecureStore from 'expo-secure-store';

const userId = isNaN(USER_ID) ? null : USER_ID;

const serverApi = axios.create({
  baseURL: SERVER_URL + '/api',
});

serverApi.interceptors.request.use(async request => {
  if (!request.data) {
    request.data = {};
  }
  if (REACT_ENV !== 'production' && userId) {
    request.data.userId = userId;
  }
  try {
    const token = await SecureStore.getItemAsync('Bearer');
    if (token) {
      console.log('serverApi', token);
      request.headers.authorization = `jwt ${token.slice(0, -1)}`;
    };
    return request;
  } catch (e) {
    throw new Error('error retrieving token');
  }
});

export default serverApi;
