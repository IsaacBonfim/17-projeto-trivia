import { combineReducers } from 'redux';
import reducer from './reducer';
import apiToken from './token';

const rootReducer = combineReducers({
  reducer,
  apiToken,
});

export default rootReducer;
