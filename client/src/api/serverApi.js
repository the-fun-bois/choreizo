import axios from 'axios';
import { SERVER_URL, REACT_ENV, USER_ID } from 'react-native-dotenv';
import * as SecureStore from 'expo-secure-store';

//get the auth token from secure_store
// console.log('server url', SERVER_URL);

const serverApi = axios.create({
  baseURL: SERVER_URL + '/api',
});

serverApi.interceptors.request.use(async request => {
  const token = await SecureStore.getItemAsync('Bearer');
  if (token) {
    request.headers.authorization = `jwt ${token.slice(0, -1)}`;
  }
  return request;
});

export default serverApi;
