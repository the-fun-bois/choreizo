import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { REACT_ENV } from 'react-native-dotenv';
import rootReducer from './rootReducer';

const middleWare = [];
if (REACT_ENV !== 'production') {
  middleWare.push(logger);
}
middleWare.push(thunk);

const store = createStore(rootReducer, applyMiddleware(...middleWare));
export default store;
