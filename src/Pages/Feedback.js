import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Feedback extends React.Component {
  render() {
    const { score } = this.props;
    const minScore = 3;

    return (
      <section>
        <Header />
        <h3 data-testid="feedback-text">
          { score >= minScore ? 'Well Done!' : 'Could be better...' }
        </h3>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
