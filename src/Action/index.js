export const TOKEN = 'TOKEN';

export const apiToken = (state) => (
  {
    type: TOKEN,
    token: state,
  }
);

export const getToken = () => (
  async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();

      dispatch(apiToken(data));
    } catch (error) {
      dispatch(console.log(error.message));
    }
  }
);
