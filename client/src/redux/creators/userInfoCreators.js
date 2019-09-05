import axios from 'axios';
import serverApi from '../../api/serverApi';
import * as Facebook from 'expo-facebook';
import { navigate } from '../../nav/navJumpAsync';

// action constants
export const GET_FBUSER_INFO = 'GET_USER_INFO';
export const GET_USER_CHORES = 'GET_USER_CHORES';

// action creators

export const getUserChores = chores => {
  type: GET_USER_CHORES, chores;
};

export const getFbUserInfo = (name, pictureUrl) => ({
  type: GET_FBUSER_INFO,
  name,
  pictureUrl,
});

// Thunks

// User chore thunk
export const fetchChores = () => dispatch => {
  return serverApi
    .post('/chores/all_personal_chores', {
      userId: 2,
    })
    .then(result => {
      console.log(result);
      dispatch(getUserChores);
    })
    .catch(err => {
      console.log('Cannot fetch chores', err.response);
    });
};

// fbLoginThunk
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
            dispatch(getFbUserInfo(data.name, data.picture.data.url));
            navigate('Main');
          })
          .catch(err => console.error('Login error: ', err));
      }
    })
    .catch(err => {
      Alert.alert(`Facebook Login Error: ${err}`);
    });
};
