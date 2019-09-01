// this is just a place holder
const { GOT_USER_INFO } = require('./../creators');

const initialState = { name: 'mark' };
export default userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER_INFO: {
      return action.userInfo;
    }
    default:
      return state;
  }
};
