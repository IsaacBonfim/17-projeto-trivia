/* eslint-disable react/jsx-closing-tag-location */
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
      answers: [],
      isDisable: false,
      isNext: false,
    };
  }

  async componentDidMount() {
    const { token, fetchQuestions } = this.props;
    await fetchQuestions(token);

    const { question } = this.props;
    const incorrects = question.results[0]
      .incorrect_answers.map((inc) => ({ answersOption: inc, isCorrect: false }));
    const corrects = {
      answersOption: question.results[0]
        .correct_answer,
      isCorrect: true,
    };

    const array = [...incorrects, corrects];
    const consttest = this.shuffleArray(array);
    this.setState({
      isLoading: false,
      answers: consttest,
    });

    this.couter();
  }

  shuffleArray = (array) => {
    const NUMBER = 0.5;
    return array.sort(() => Math.random() - NUMBER);
  }

  nextAnswer = ({ target }) => {
    this.setState({ isNext: true });
    const li = target.parentNode;
    const buttons = li.childNodes;
    buttons.forEach((button) => {
      const dataTest = button.getAttribute('data-testid');
      if (dataTest === 'correct-answer') {
        button.className = 'green-border';
      } else {
        button.className = 'red-border';
      }
    });
  }

  couter = () => {
    const seconds = 30000;
    setTimeout(() => {
      this.setState({
        isDisable: true,
      });
    }, seconds);
  }

  nextQuestion = () => {
    const { question } = this.props;
    this.setState(({ position }) => ({
      position: position === question.results.length - 1 ? 0
        : position + 1,
      isNext: false,
    }), () => {
      const { position } = this.state;
      const incorrects = question.results[position]
        .incorrect_answers.map((inc) => ({ answersOption: inc, isCorrect: false }));
      const corrects = {
        answersOption: question.results[0]
          .correct_answer,
        isCorrect: true,
      };
      const array = [...incorrects, corrects];
      const consttest = this.shuffleArray(array);
      this.setState({
        isLoading: false,
        answers: consttest,
      });
    });
  }

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { question } = this.props;
    const { isLoading, position, answers, isNext, isDisable } = this.state;

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
                <ul>
                  <li data-testid="answer-options">
                    { answers.map((elem, index) => (
                      <button
                        key={ index }
                        id={ index }
                        type="button"
                        data-testid={ elem.isCorrect
                          ? 'correct-answer'
                          : `wrong-answer-${answers.findIndex((ind) => ind
                            .isCorrect) < index ? index - 1 : index}` }
                        onClick={ this.nextAnswer }
                        disabled={ isDisable }
                      >
                        { elem.answersOption }
                      </button>
                    ))}
                  </li>
                </ul>
                { isNext
                && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.nextQuestion }
                  >
                    Next
                  </button>)}

                <button
                  type="button"
                  onClick={ this.playAgain }
                  data-testid="btn-play-again"
                >
                  Play again
                </button>

              </section>
            //   <Question
            //     questionAPI={ question.results[0].question }
            //     category={ question.results[0].category }
            //     correctAnswer={ question.results[0].correct_answer }
            //     incorrectAnswers={ question.results[0].incorrect_answers[0] }
            //   />  ---  favor nao apagar.
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
