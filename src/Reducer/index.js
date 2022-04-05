import { combineReducers } from 'redux';
import player from './reducer';
import token from './token';

const rootReducer = combineReducers({
  player,
  token,
});

export default rootReducer;
