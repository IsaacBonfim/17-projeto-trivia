import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Questions from '../Components/Questions';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <section>
        <Header />
        <Questions history={ history } />
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
