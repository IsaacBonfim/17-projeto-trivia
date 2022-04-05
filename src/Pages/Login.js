import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../Action';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      btnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.validButton());
  }

  validButton = () => {
    const { email, name } = this.state;
    const number = 2;
    let button = true;

    if (name.length > number && this.validEmail(email)) button = false;

    this.setState({
      btnDisabled: button,
    });
  }

  validEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)

  redirectToGame = () => {
    const { dispatch, history } = this.props;

    dispatch(getToken());

    history.push('/game');
  }

  render() {
    const { btnDisabled, name, email } = this.state;

    return (
      <main>
        <img src={ logo } className="App-logo" alt="logo" />
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          type="email"
          name="email"
          data-testid="input-gravatar-email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ btnDisabled }
          onClick={ this.redirectToGame }
        >
          Play
        </button>
      </main>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({

// });

Login.propTypes = {
  dispatch: PropType.func.isRequired,
  history: PropType.shape({
    push: PropType.string,
  }).isRequired,
};

export default connect()(Login);
