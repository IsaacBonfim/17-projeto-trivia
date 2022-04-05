import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sendInfoPlayer from '../Action';
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
    let button = true;
    const number = 2;
    const { email, name } = this.state;
    if (name.length > number && this.validEmail(email)) button = false;
    this.setState({
      btnDisabled: button,
    });
  }

  validEmail = (email) => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)

  handleClickButton = () => {
    const { sendInfo, history } = this.props;
    const { name, email } = this.state;
    sendInfo({ email, name });

    history.push('/game');
  }

  render() {
    const { btnDisabled, name, email } = this.state;
    return (
      <main>
        <img src={ logo } className="App-logo" alt="logo" />
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          name="email"
          type="email"
          data-testid="input-gravatar-email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ btnDisabled }
          onClick={ this.handleClickButton }
        >
          Play
        </button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendInfo: (state) => dispatch(sendInfoPlayer(state)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  sendInfo: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  })).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
