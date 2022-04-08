import React from 'react';
import Header from '../Components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <section>
        <Header />
        <p data-testid="feedback-text">Parabéns!!! </p>
      </section>
    );
  }
}

export default Feedback;
