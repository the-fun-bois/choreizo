import serverApi from '../../api/serverApi';
import * as Facebook from 'expo-facebook';
import { navigate } from '../../nav/navJumpAsync';
import * as SecureStore from 'expo-secure-store';

// action constants
export const GET_FBUSER_INFO = 'GET_USER_INFO';
export const GET_USER_CHORES = 'GET_USER_CHORES';

export const SET_BEARER_TOKEN = 'SET_BEARER_TOKEN';

export const GET_USER_PROFILE = 'USER_PROFILE';

export const setBearerToken = token => ({
  type: SET_BEARER_TOKEN,
  token,
});

// action creators

export const getUserChores = chores => {
  type: GET_USER_CHORES, chores;
};

export const getFbUserInfo = (name, pictureUrl) => ({
  type: GET_FBUSER_INFO,
  name,
  pictureUrl,
});

export const getUserProfile = user => ({
  type: GET_USER_PROFILE,
  user,
});
// Thunks

// User chore thunk
export const fetchChores = () => dispatch => {
  return serverApi
    .post('/chores/all_personal_chores', {
      userId: 2,
    })
    .then(({ data }) => {
      dispatch(getUserChores(data));
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
            `https://graph.facebook.com/me?fields=name,email,hometown,picture&access_token=${token}`,
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

export const getBearerToken = token => async dispatch => {
  try {
    await SecureStore.setItemAsync('Bearer', token);
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
  try {
    const userProfile = await serverApi.get('/user/profile');
    if (!userProfile.data.email) throw new Error('Auth error');
    dispatch(getUserProfile(userProfile.data));
  } catch (e) {
    console.log(e);
    navigate('Login');
  }
};

export const logout = () => async dispatch => {};
