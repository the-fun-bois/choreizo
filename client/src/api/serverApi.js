import axios from 'axios';
import { SERVER_URL, REACT_ENV, USER_ID } from 'react-native-dotenv';
import * as SecureStore from 'expo-secure-store';

//get the auth token from secure_store
// console.log('server url', SERVER_URL);
const userId = USER_ID || null;
const data = {};
if (REACT_ENV !== 'production' && userId) {
  data.userId = userId;
}
const serverApi = axios.create({
  baseURL: SERVER_URL + '/api',
  data,
});

serverApi.interceptors.request.use(async request => {
  try {
    const token = await SecureStore.getItemAsync('Bearer');
    if (token) {
      request.headers.authorization = `jwt ${token.slice(0, -1)}`;
    }
    return request;
  } catch (e) {
    throw new Error('error retrieving token');
  }
});

export default serverApi;
