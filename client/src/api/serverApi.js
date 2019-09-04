import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';
import * as SecureStore from 'expo-secure-store';

//get the auth token from secure_store
console.log('server url', SERVER_URL);

const serverApi = axios.create({
  baseURL: SERVER_URL + '/api',
});

serverApi.interceptors.request.use(async request => {
  const token = await SecureStore.getItemAsync('Bearer');
  // console.log('token from secure store', token)
  if (token) {
    request.headers.authorization = `jwt ${token.slice(0, -1)}`;
  };
  console.log('request header: ', request.headers);
  return request;
});

export default serverApi;
