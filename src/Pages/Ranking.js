import React from 'react';
import PropTypes from 'prop-types';
import getRanking from '../Helpers';
import '../Styles/Ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = getRanking();
    ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <>
        <header className="ranking-header">
          <span
            className="ranking-title"
            data-testid="ranking-title"
          >
            Ranking
          </span>
        </header>
        <main className="ranking-main">
          <section className="ranking-container">
            <ol className="ranking-list">
              { ranking.map(({ name, score, picture }, index) => (
                <li key={ index } className="ranking-list-item">
                  {/* <div className="ranking-list-div"> */}
                  <img
                    className="rankin-img"
                    src={ `https://www.gravatar.com/avatar/${picture}` }
                    alt={ name }
                  />
                  <p
                    className="rankin-player-name"
                    data-testid={ `player-name-${index}` }
                  >
                    { name }
                  </p>
                  <p
                    className="rankin-player-score"
                    data-testid={ `player-score-${index}` }
                  >
                    { score }
                  </p>
                  {/* </div> */}
                </li>
              )) }
            </ol>
          </section>
          <button
            type="button"
            className="play-again back-button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Voltar
          </button>
        </main>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
