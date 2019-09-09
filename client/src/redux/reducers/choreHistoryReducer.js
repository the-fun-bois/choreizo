import { GOT_CHORE_HISTORY } from './../creators';
const initialState = [{ status: '', chore: { name: '' } }];

const choreHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CHORE_HISTORY:
      return action.choreHistory;
    default:
      return state;
  }
};

export default choreHistoryReducer;
