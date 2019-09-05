// this is just a place holder
const { GET_FBUSER_INFO, GET_USER_CHORES } = require('./../creators');

const initialState = {
  name: '',
  pictureUrl: '',
  isSignedIn: false,
  chores: {},
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
    case GET_USER_CHORES: {
      return {
        ...state,
        chores: action.chores,
      };
    }
    default:
      return state;
  }
};
