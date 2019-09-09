import { GOT_USER_CHORES } from './../creators';

const initialState = [
  {
    id: '',
    status: '',
    choreId: '',
    expiresOn: '',
    chore: { name: '', difficulty: '', penalty: '', details: '' },
  },
];

const userChoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER_CHORES:
      return action.userChores;
    default:
      return state;
  }
};

export default userChoresReducer;
