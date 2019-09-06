import { SET_BEARER_TOKEN, GET_USER_PROFILE } from '../creators';

// this is just a place holder
const { GET_FBUSER_INFO, GET_USER_CHORES } = require('./../creators');

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
        isSignedIn: true,
      };
    }
    case SET_BEARER_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case GET_USER_PROFILE:
      return Object.assign({}, state, action.user);

    default:
      return state;
  }
};
