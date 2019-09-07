import { GOT_ALL_GROUP_USERS } from './../creators';

const initialState = [
  {
    id: '',
    firstName: '',
    surName: '',
    email: '',
    userIsAdmin: false,
    userStatus: '',
    groupId: '',
  },
];

const allGroupUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_GROUP_USERS:
      return action.groupMembers;
    default:
      return state;
  }
};

export default allGroupUsersReducer;
