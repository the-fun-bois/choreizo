import axios from 'axios';
import { SERVER_URL } from 'react-native-dotenv';

//get the auth token from secure_store
console.log('server url', SERVER_URL);

const serverApi = axios.create({
  baseURL: SERVER_URL + '/api',
  headers: { Authorization: 'clients_auth_token' },
});

export default serverApi;
