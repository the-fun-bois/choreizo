import { GOT_USER_CHORES, COMPLETED_USER_CHORE } from './../creators';

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
    case COMPLETED_USER_CHORE:
      const newStateWithoutChore = state.filter(chore => {
        if (chore.id !== action.choreId) return chore;
      });
      return {
        ...newStateWithoutChore,
      };
    default:
      return state;
  }
};

export default userChoresReducer;
