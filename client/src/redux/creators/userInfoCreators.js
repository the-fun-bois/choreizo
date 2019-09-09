import serverApi from '../../api/serverApi';
import * as Facebook from 'expo-facebook';
import { navigate } from '../../nav/navJumpAsync';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import axios from 'axios';

// action constants
export const GET_FBUSER_INFO = 'GET_USER_INFO';
export const GET_USER_CHORES = 'GET_USER_CHORES';
export const SET_BEARER_TOKEN = 'SET_BEARER_TOKEN';
export const SET_BEARER_TOKEN_STATE = 'SET_BEARER_TOKEN_STATE';
export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const GOT_USER_WALLET = 'GOT_USER_WALLET';

export const setBearerToken = token => ({
  type: SET_BEARER_TOKEN,
  token,
});

export const setBearerTokenState = (userId, token) => ({
  type: SET_BEARER_TOKEN_STATE,
  userId,
  token,
});

// action creators

export const getFbUserInfo = (name, pictureUrl, email) => ({
  type: GET_FBUSER_INFO,
  name,
  pictureUrl,
  email,
});

export const getUserProfile = user => ({
  type: GET_USER_PROFILE,
  user,
});
export const gotUserWallet = wallet => ({ type: GOT_USER_WALLET, wallet });
// Thunks
export const fbLogin = () => dispatch => {
  Facebook.logInWithReadPermissionsAsync('895184290846348', {
    permissions: ['public_profile'],
  })
    .then(result => {
      const { type, token, expires, permissions, declinedPermissions } = result;
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        axios
          .get(
            `https://graph.facebook.com/me?fields=name,email,hometown,picture&access_token=${token}`
          )
          .then(result => result.data)
          .then(data => {
            // attach name and picture url to state
            dispatch(
              getFbUserInfo(data.name, data.picture.data.url, data.email, true)
            );
            // send data to backend to receive a token
            fbServerHelper(data.email, dispatch);
            // may need to change
            navigate('Home');
          })
          .catch(err => console.error('Login error: ', err));
      }
    })
    .catch(err => {
      Alert.alert(`Facebook Login Error: ${err}`);
    });
};

export const secureStoreBearerToken = (userId, token) => async dispatch => {
  try {
    /*
    Save the token to secure storage with the key 'Bearer' 
    */
    await SecureStore.setItemAsync('Bearer', token);
    // sets token to state
    dispatch(setBearerTokenState(userId, token));
  } catch (e) {
    console.log(e);
  }
};

export const getBearerToken = token => async dispatch => {
  try {
    await SecureStore.setItemAsync('Bearer', token);
    /*
    Save the token to secure storage with the key 'Bearer' 
    */
    dispatch(setBearerToken(token));
  } catch (e) {
    console.log(e);
  }
};

export const retrieveToken = () => async dispatch => {
  try {
    const token = await SecureStore.getItemAsync('Bearer');
    if (token) {
      dispatch(setBearerToken(token.slice(0, -1)));
      navigate('Home');
    }
  } catch (e) {
    console.log(e);
  }
};

export const getUserInfo = () => async dispatch => {
  console.log('get user thunk');
  try {
    const response = await serverApi.post('/user/profile');
    console.log('user info', response.data);
    dispatch(getUserProfile(response.data));
    return;
  } catch (e) {
    console.log('error getting user info \n', e);
  }
};

export const getUserWalletThunk = () => {
  return dispatch => {
    serverApi.post('/user/wallet').then(response => {
      const wallet = response.data;
      dispatch(gotUserWallet(wallet));
    });
  };
};

const fbServerHelper = (email, dispatch) => {
  const user = {
    email,
  };

  return serverApi
    .post('/auth/facebook/token', user)
    .then(response => {
      const responseSplit = response.data.split('-');
      const userId = responseSplit[0];
      const token = responseSplit[1];
      dispatch(secureStoreBearerToken(userId, token));
    })
    .catch(e => {
      console.log('couldnt receive token', e);
    });
};
