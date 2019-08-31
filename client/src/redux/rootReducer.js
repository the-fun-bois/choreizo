import { combineReducers } from 'redux';
import userInfoReducer from './reducers/userInfoReducer';

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
});

export default rootReducer;
