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
    },
    swapAssignedChore1: {
      id: '',
      status: '',
      user1Id: '',
      user2Id: '',
      swapAssignedChore1Id: '',
      swapAssignedChore2Id: '',
      user1: {
        id: '',
        firstName: '',
        surName: '',
        email: '',
      },
      user2: {
        id: '',
        firstName: '',
        surName: '',
        email: '',
      },
    },
    swapAssignedChore2: {
      id: '',
      status: '',
      user1Id: '',
      user2Id: '',
      swapAssignedChore1Id: '',
      swapAssignedChore2Id: '',
      user1: {
        id: '',
        firstName: '',
        surName: '',
        email: '',
      },
      user2: {
        id: '',
        firstName: '',
        surName: '',
        email: '',
      },
    },
  },
];

const marketChoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MARKET_CHORES:
      return action.marketChores;
    default:
      return state;
  }
};

export default marketChoresReducer;
