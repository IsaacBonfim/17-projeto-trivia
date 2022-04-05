const INITIAL_STATE = {
  login: '',
  email: '',
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'Login':
    return {};
  default:
    return state;
  }
};

export default reducer;
