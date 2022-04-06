import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    // const { question } = this.props;
    const { category, questionAPI, correctAnswer,
      incorrectAnswers } = this.props;
    return (

      <section>
        <h1>
          { category }
        </h1>
        <p>{ questionAPI }</p>
        <ul>
          <li>
            <button
              type="button"
            >
              { correctAnswer }
            </button>
          </li>
          <li>
            <button
              type="button"
            >
              { incorrectAnswers }
            </button>
          </li>
        </ul>
      </section>
    );
  }
}

export default Question;

Question.propTypes = {
  category: PropTypes.string.isRequired,
  questionAPI: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.string.isRequired,
};
