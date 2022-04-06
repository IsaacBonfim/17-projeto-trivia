export const TOKEN = 'TOKEN';
export const SEND_INFO = 'SEND_INFO';
export const GET_QUESTION = 'GET_QUESTION';

export const apiToken = (token) => (
  {
    type: TOKEN,
    token,
  }
);

export const getQuestion = (question) => (
  {
    type: GET_QUESTION,
    question,
  }
);

export const getToken = () => (
  async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      const { token } = data;

      dispatch(apiToken(token));
    } catch (error) {
      dispatch(console.log(error.message));
    }
  }
);

export const sendInfoPlayer = (value) => ({
  type: SEND_INFO,
  value,
});

export const getQuestions = (token) => async (dispatch) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();

  dispatch(getQuestion(data));
};
