import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions, getScore } from '../Action';
import Loading from './Loading';
import '../Styles/Questions.css';

const dataTestId = 'data-testid';
const dataTestIdCorrectAnswer = 'correct-answer';

class Questions extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      position: 0,
      answers: [],
      isDisable: false,
      isNext: false,
      stopTime: false,
      timer: 30,
      correctAnswer: 0,
      score: 0,
    };
  }

  async componentDidMount() {
    const { token, fetchQuestions } = this.props;
    await fetchQuestions(token);
    const { position } = this.state;
    const { question } = this.props;
    const incorrects = question.results[position]
      .incorrect_answers.map((inc) => ({ answersOption: inc, isCorrect: false }));
    const corrects = {
      answersOption: question.results[position].correct_answer,
      isCorrect: true,
    };
    const array = [...incorrects, corrects];
    const consttest = this.shuffleArray(array);
    this.setState({ isLoading: false, answers: consttest });
    this.couter();
    const second = 1000;
    setInterval(() => this.contador(), second);
  }

  shuffleArray = (array) => {
    const NUMBER = 0.5;
    return array.sort(() => Math.random() - NUMBER);
  }

  handlerAnswer = ({ target }) => {
    this.setState({ isNext: true });
    const li = target.parentNode;
    const buttons = li.childNodes;
    buttons.forEach((button) => {
      const dataTest = button.getAttribute(dataTestId);
      if (dataTest === dataTestIdCorrectAnswer) {
        button.className = 'green-border';
      } else {
        button.className = 'red-border';
      }
    });
    const correct = target.getAttribute(dataTestId);
    const difficulty = target.getAttribute('name');
    const teen = 10;
    const tree = 3;
    const two = 2;
    const { correctAnswer, timer } = this.state;
    const { sendScore } = this.props;
    if (difficulty === 'hard' && correct === dataTestIdCorrectAnswer) {
      this.setState({
        stopTime: true,
        correctAnswer: correctAnswer + 1,
        score: teen + (timer * tree),
      }, () => sendScore(this.state));
    } else if (difficulty === 'medium' && correct === dataTestIdCorrectAnswer) {
      this.setState({
        stopTime: true,
        correctAnswer: correctAnswer + 1,
        score: teen + (timer * two),
      }, () => sendScore(this.state));
    } else if (difficulty === 'easy' && correct === dataTestIdCorrectAnswer) {
      this.setState({
        stopTime: true,
        correctAnswer: correctAnswer + 1,
        score: teen + timer,
      }, () => sendScore(this.state));
    }
  }

  couter = () => {
    const seconds = 30000;
    setTimeout(() => {
      this.setState({ isDisable: true, isNext: true });
    }, seconds);
  }

  contador = () => {
    const second = 1;
    const { timer, stopTime } = this.state;
    if (!stopTime) {
      this.setState({ timer: timer > 0 ? timer - second : 0 });
    } else {
      this.setState({ timer });
    }
  }

  nextQuestion = () => {
    const { question } = this.props;

    this.setState({ timer: 30, stopTime: false, correctAnswer: 0, score: 0 });

    const { position } = this.state;
    const MAX_LENGTH = 5;

    if (position < MAX_LENGTH) {
      this.setState((prevState) => ({ position: prevState.position + 1, isNext: false }),
        () => {
          const incorrects = question.results[position]
            .incorrect_answers.map((inc) => ({ answersOption: inc, isCorrect: false }));
          const corrects = {
            answersOption: question.results[position].correct_answer,
            isCorrect: true,
          };
          const array = [...incorrects, corrects];
          const consttest = this.shuffleArray(array);
          this.setState({ isLoading: false, answers: consttest });
        });
    }
  }

  render() {
    const { question } = this.props;
    const { isLoading, position, answers, isNext, isDisable, timer } = this.state;

    const MAX_LENGTH = 5;
    if (position === MAX_LENGTH) {
      return <Redirect to="/feedback" />;
    }
    return (
      <>
        <p className="game-timer">{ `Tempo: ${timer}` }</p>
        {
          isLoading
            ? <Loading />
            : (
              <section className="questions-container">
                <h1 data-testid="question-category" className="question-category">
                  { question.results[position].category }
                </h1>
                <p data-testid="question-text" className="question-text">
                  { question.results[position].question }
                </p>
                <ul className="question-ul">
                  <li data-testid="answer-options" className="question-li">
                    { answers.map((elem, index) => (
                      <button
                        key={ index }
                        id={ index }
                        name={ question.results[position].difficulty }
                        type="button"
                        className="question-answer"
                        data-testid={ elem.isCorrect
                          ? 'correct-answer'
                          : `wrong-answer-${answers.findIndex((ind) => ind
                            .isCorrect) < index ? index - 1 : index}` }
                        onClick={ this.handlerAnswer }
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
                    className="question-next"
                    data-testid="btn-next"
                    onClick={ this.nextQuestion }
                  >
                    Next
                  </button>)}
              </section>
            //   <Question
            //     questionAPI={ question.results[0].question }
            //     category={ question.results[0].category }
            //     correctAnswer={ question.results[0].correct_answer }
            //     incorrectAnswers={ question.results[0].incorrect_answers[0] }
            //   />  ---  favor nao apagar.
            )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  question: state.player.question,
});
const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(getQuestions(token)),
  sendScore: (score) => dispatch(getScore(score)),
});

Questions.propTypes = {
  token: PropTypes.instanceOf(Object).isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  sendScore: PropTypes.func.isRequired,
  question: PropTypes.arrayOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
