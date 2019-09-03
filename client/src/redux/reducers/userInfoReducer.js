// this is just a place holder
const { GET_FBUSER_INFO, SET_BEARER_TOKEN } = require('./../creators');

const initialState = {
  name: '',
  pictureUrl: '',
  isSignedIn: false,
  bearerToken: '',
};

export default userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FBUSER_INFO:
      return {
        ...state,
        name: action.name,
        pictureUrl: action.pictureUrl,
        isSignedIn: true,
      };
    case SET_BEARER_TOKEN:
      return {
        ...state,
        isSignedIn: true,
        bearerToken: action.token,
      }
    default:
      return state;
  }
};
