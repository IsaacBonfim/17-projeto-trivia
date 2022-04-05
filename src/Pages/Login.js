import React from 'react';
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
        >
          Play
        </button>
      </main>
    );
  }
}

export default Login;
