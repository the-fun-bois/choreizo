import { combineReducers } from 'redux';
import userInfoReducer from './reducers/userInfoReducer';
import userChoresReducer from './reducers/userChoresReducer';
import marketChoresReducer from './reducers/marketChoresReducer';
import allGroupUsersReducer from './reducers/allGroupUsersReducer';
import swappableChoresReducer from './reducers/swappableChoresReducer';
import choreHistoryReducer from './reducers/choreHistoryReducer';

const appReducer = combineReducers({
  userInfo: userInfoReducer,
  userChores: userChoresReducer,
  marketChores: marketChoresReducer,
  allGroupUsers: allGroupUsersReducer,
  swappableChores: swappableChoresReducer,
  choreHistory: choreHistoryReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
