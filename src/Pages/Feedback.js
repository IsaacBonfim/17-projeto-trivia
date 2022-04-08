import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Feedback extends React.Component {
  componentDidMount() {
    const { assertions, score, name, picture } = this.props;
    const storage = JSON.parse(localStorage.getItem('ranking'));
    const obj = {
      name,
      score,
      assertions,
      picture,
    };
    if (storage) {
      localStorage.setItem('ranking', JSON.stringify([...storage, obj]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([obj]));
    }
  }

  render() {
    const { assertions, score, history } = this.props;
    const min = 3;

    return (
      <section>
        <Header />
        <h3 data-testid="feedback-text">
          { assertions >= min ? 'Well Done!' : 'Could be better...' }
        </h3>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-play-again"
        >
          Play again
        </button>

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  picture: state.player.gravatarEmail,
  name: state.player.name,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
