import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import '../Styles/Feedback.css';

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
    const min = 0;

    return (
      <>
        <Header />
        <section className="feedback-container">
          { assertions >= min ? (
            <span
              className="well-done"
              data-testid="feedback-text"
            >
              Well Done!
            </span>)
            : (
              <span
                className="could-be-better"
                data-testid="feedback-text"
              >
                Could be better...
              </span>
            )}
          <div className="feedback-result">
            <div className="feedback-score-div">
              <span>Total Score:</span>
              <span data-testid="feedback-total-score">{ score }</span>
            </div>
            <div className="feedback-answers-div">
              <span>Total Correct Answers:</span>
              <span data-testid="feedback-total-question">{ assertions }</span>
            </div>
          </div>

          <div className="feedback-buttons">
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
              className="ranking-button"
              data-testid="btn-ranking"
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
