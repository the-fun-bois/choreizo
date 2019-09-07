import {
  SET_BEARER_TOKEN,
  GET_USER_PROFILE,
  GET_FBUSER_INFO,
  GET_USER_CHORES,
  SET_BEARER_TOKEN_STATE,
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
        userId: action.userId,
      };
    case SET_BEARER_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        id: action.user.id,
        firstName: action.user.firstName,
        surName: action.user.surName,
        email: action.user.email,
      }
    default:
      return state;
  }
};
