import { GOT_SWAPPABLE_CHORES } from '../creators/swappableChoresCreators';

const initialState = [
  {
    id: '',
    status: '',
    expiresOn: '',
    chore: {
      name: '',
      details: [],
      groupId: '',
    },
    user: {
      id: '',
      firstName: '',
      surName: '',
      email: '',
    },
  },
];

const swappableChoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_SWAPPABLE_CHORES:
      return action.swappableChores;
    default:
      return state;
  }
};

export default swappableChoresReducer;
