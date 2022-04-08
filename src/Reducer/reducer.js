import md5 from 'crypto-js/md5';
import { SEND_INFO, GET_QUESTION, SEND_SCORE } from '../Action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',

};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_INFO:
    return {
      ...state,
      ...action.value,
      gravatarEmail: md5(action.value.email).toString(),
    };
  case GET_QUESTION:
    return {
      ...state,
      question: action.question,
    };
  case SEND_SCORE:
    return {
      ...state,
      assertions: state.assertions + action.score.correctAnswer,
      score: state.score + action.score.score,
    };
  default:
    return state;
  }
};

export default player;
