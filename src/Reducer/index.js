import { combineReducers } from 'redux';
import reducer from './reducer';
import token from './token';

const rootReducer = combineReducers({
  reducer,
  token,
});

export default rootReducer;
