import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { REACT_ENV, REDUX_LOGGER_ENABLED } from 'react-native-dotenv';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleWare = [];
if (REACT_ENV !== 'production' && REDUX_LOGGER_ENABLED === 'true') {
  middleWare.push(logger);
}
middleWare.push(thunk);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWare)),
);
export default store;
