import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Questions from '../Components/Questions';
import '../Styles/Game.css';

class Game extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <section className="game-container">
          <Questions history={ history } />
          <div>
            <button
              type="button"
              className="play-again"
              onClick={ () => history.push('/') }
              data-testid="btn-play-again"
            >
              Play again
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              className="ranking-button"
              onClick={ () => history.push('/ranking') }
            >
              Ranking
            </button>
          </div>
        </section>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
