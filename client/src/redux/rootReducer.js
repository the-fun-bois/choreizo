import { combineReducers } from 'redux';
import userInfoReducer from './reducers/userInfoReducer';
import userChoresReducer from './reducers/userChoresReducer';
import marketChoresReducer from './reducers/marketChoresReducer';
const appReducer = combineReducers({
  userInfo: userInfoReducer,
  userChores: userChoresReducer,
  marketChores: marketChoresReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
