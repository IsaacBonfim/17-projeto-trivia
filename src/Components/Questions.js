import React from 'react';
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
    const second = 1000;
    this.timer = setInterval(() => this.contador(), second);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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

  contador = () => {
    const second = 1;
    const { timer, stopTime } = this.state;
    if (!stopTime) {
      this.setState({ timer: timer > 0 ? timer - second : 0 }, () => {
        if (timer === 0) {
          this.setState({ isDisable: true, isNext: true });
        }
      });
    } else {
      this.setState({ timer });
    }
  }

  shuffleArray = (array) => {
    const NUMBER = 0.5;
    return array.sort(() => Math.random() - NUMBER);
  }

  nextQuestion = () => {
    const { question, history } = this.props;
    const MAX_LENGTH = 4;
    this.setState((prevState) => ({
      position: prevState.position < MAX_LENGTH ? prevState.position + 1 : 0,
      isNext: false,
      timer: 30,
      stopTime: false,
      correctAnswer: 0,
      score: 0,

    }), () => {
      const { position } = this.state;
      if (position === 0) {
        history.push('/feedback');
      } else {
        const incorrects = question.results[position]
          .incorrect_answers.map((inc) => ({ answersOption: inc, isCorrect: false }));
        const corrects = {
          answersOption: question.results[position].correct_answer,
          isCorrect: true,
        };
        const array = [...incorrects, corrects];
        const consttest = this.shuffleArray(array);
        this.setState({ isLoading: false, answers: consttest });
      }
    });
  }

  render() {
    const { question } = this.props;
    const { isLoading, position, answers, isNext, isDisable, timer } = this.state;

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
