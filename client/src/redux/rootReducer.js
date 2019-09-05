import { combineReducers } from 'redux';
import userInfoReducer from './reducers/userInfoReducer';

const appReducer = combineReducers({
  userInfo: userInfoReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
