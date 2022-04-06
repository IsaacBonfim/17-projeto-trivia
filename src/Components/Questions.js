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
    };
  }

  async componentDidMount() {
    const { token, fetchQuestions } = this.props;
    console.log(token);
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
    console.log(consttest);
    // const random = array[Math.floor(Math.random() * array.length)];
    // console.log(random);
    this.setState({
      isLoading: false,
      answers: array,
    });
  }

  shuffleArray = (array) => {
    const NUMBER = 0.5;
    return array.sort(() => Math.random() - NUMBER);
  }

  nextAnswer = () => {
    const { question } = this.props;
    console.log(question);
    this.setState(({ position }) => ({
      position: position === question.results.length - 1 ? 0
        : position + 1,
    }));
  }

  handleTestId = (elem, index) => {
    if (elem.isCorrect) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  render() {
    const { question } = this.props;
    const { isLoading, position, answers } = this.state;

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
                  { answers.map((elem, index) => (
                    <li key={ index }>
                      <button
                        type="button"
                        onClick={ this.nextAnswer }
                        data-testid={ elem.isCorrect
                          ? 'correct-answer' : `wrong-answer-${index}` }
                      >
                        { elem.answersOption }
                      </button>
                    </li>
                  ))}
                  {/* data-testid= */}
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
