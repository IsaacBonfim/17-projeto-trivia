import { TOKEN } from '../Action';

const INICIAL_STATE = {
  response_code: 0,
  response_message: '',
  token: '',
};

function apiToken(state = INICIAL_STATE, action) {
  switch (action.type) {
  case TOKEN:
    return {
      ...state,
      response_code: action.response_code,
      response_message: action.response_message,
      token: action.token,
    };
  default:
    return state;
  }
}

export default apiToken;
