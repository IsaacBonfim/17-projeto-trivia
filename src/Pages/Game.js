import React from 'react';
import logo from '../trivia.png';

class Game extends React.Component {
  render() {
    return (
      <img src={ logo } className="App-logo" alt="logo" />
    );
  }
}

export default Game;
