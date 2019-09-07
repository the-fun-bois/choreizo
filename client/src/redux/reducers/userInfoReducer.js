import {
  SET_BEARER_TOKEN_STATE,
  GET_USER_PROFILE,
  GET_FBUSER_INFO,
  GET_USER_CHORES,
} from '../creators';

const initialState = {
  id: '',
  pictureUrl: '',
  isSignedIn: false,
  firstName: '',
  surName: '',
  email: '',
  token: '',
  groups: [
    { id: '', name: '', description: '', userGroup: { userIsAdmin: false } },
  ],
};

export default userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FBUSER_INFO: {
      return {
        ...state,
        name: action.name,
        pictureUrl: action.pictureUrl,
        email: action.email,
        isSignedIn: true,
      };
    }
    case SET_BEARER_TOKEN_STATE:
      return {
        ...state,
        token: action.token,
        id: action.userId,
      };
    case GET_USER_PROFILE:
      // console.log('get user profile user data', action.user);
      return Object.assign({}, state, action.user);

    default:
      return state;
  }
};
