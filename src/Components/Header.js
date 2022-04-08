import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, score, gravatarEmail, assertions } = this.props;

    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt={ name } data-testid="header-profile-picture" />
        <div className="nameScore">
          <p data-testid="header-player-name">{ `Nome: ${name}` }</p>
          <p data-testid="header-score">{ `Score: ${score}` }</p>
          <p data-testid="header-assertions">{ `Número de Acertos: ${assertions}` }</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};
