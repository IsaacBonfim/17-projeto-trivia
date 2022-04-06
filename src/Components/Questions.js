import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../Action';
// import Question from './Question';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      position: 0,
    };
  }

  async componentDidMount() {
    const { token, fetchQuestions } = this.props;
    console.log(token);
    await fetchQuestions(token);

    this.setState({
      isLoading: false,
    });
  }

  nextAnswer = () => {
    const { question } = this.props;
    console.log(question);
    this.setState(({ position }) => ({
      position: position === question.results.length - 1 ? 0
        : position + 1,
    }));
  }

  render() {
    const { question } = this.props;
    const { isLoading, position } = this.state;

    return (
      <section>
        {
          isLoading
            ? <h1>Loading...</h1>
            : (

              <section>
                <h1 data-testid="question-category">
                  { question.results[position].category }
                </h1>
                <p data-testid="question-text">{ question.results[position].question }</p>
                <ul data-testid="answer-options">
                  <li>
                    <button
                      type="button"
                      onClick={ this.nextAnswer }
                      data-testid="correct-answer"
                    >
                      { question.results[position].correct_answer }
                    </button>
                  </li>

                  { question.results[position].incorrect_answers.map((elem, index) => (
                    <li key={ index }>
                      <button
                        type="button"
                        onClick={ this.nextAnswer }
                        data-testid={ `wrong-answer-${index}` }
                      >
                        { elem }
                      </button>
                    </li>
                  ))}

                </ul>
              </section>
            //   <Question
            //     questionAPI={ question.results[0].question }
            //     category={ question.results[0].category }
            //     correctAnswer={ question.results[0].correct_answer }
            //     incorrectAnswers={ question.results[0].incorrect_answers[0] }
            //   />
            )
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  question: state.player.question,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(getQuestions(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  token: PropTypes.instanceOf(Object).isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  question: PropTypes.arrayOf(PropTypes.string).isRequired,
};
