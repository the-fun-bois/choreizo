import { GOT_MARKET_CHORES } from './../creators';



const initialState = [
  {
    id: '',
    status: '',
    userId: '',
    choreId: '',
    expiresOn: '',
    chore: { name: '', difficulty: '', penalty: '', details: '' },
    transferChore: {
      id: '',
      price: '',
      status: '',
      originalOwnerId: '',
      newOwnerId: '',
      assignedChoreId: '',
      originalOwner: {
        id: '',
        firstName: '',
        surName: '',
        email: '@gmail.com',
      },
    },
    tradeChore: {
      id: '',
      tradeTerms: '',
      status: '',
      originalOwnerId: '',
      newOwnerId: '',
      assignedChoreId: '',
      originalOwner: {
        id: '',
        firstName: '',
        surName: '',
        email: '',
    },
    swapAssignedChore1: {},
    swapAssignedChore2: {},
  },
];

const marketChoresReducer = (state, action) => {
  switch (action.type) {
    case GOT_MARKET_CHORES:
      return action.marketChores;
    default:
      return state;
  }
};

export default marketChoresReducer;
