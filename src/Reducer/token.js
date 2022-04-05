import { TOKEN } from '../Action';

const INICIAL_STATE = {
  token: '',
};

function token(state = INICIAL_STATE, action) {
  switch (action.type) {
  case TOKEN:
    return action.token;
  default:
    return state;
  }
}

export default token;
