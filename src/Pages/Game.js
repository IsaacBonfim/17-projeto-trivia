import React from 'react';
import Header from '../Components/Header';
import Questions from '../Components/Questions';

class Game extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <Questions />
      </section>
    );
  }
}

export default Game;
