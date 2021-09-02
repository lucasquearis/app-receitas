import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorito: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    this.setFavorite();
  }

  handleClick() {
    const { favorito } = this.state;
    if (favorito) this.setState({ favorito: false });
    if (!favorito) this.setState({ favorito: true });
  }

  setFavorite() {
    const { favorite } = this.props;
    this.setState({ favorito: favorite });
  }

  render() {
    const { favorito } = this.state;
    const { position } = this.props;

    return (
      <button
        type="button"
        className="share-fill"
        onClick={ this.handleClick }
      >
        <img
          src={ favorito ? BlackHeartIcon : WhiteHeartIcon }
          alt="favorite button"
          data-testid={ `${position}-horizontal-favorite-btn` }
        />
      </button>
    );
  }
}

export default FavoriteButton;

FavoriteButton.propTypes = {
  index: PropTypes.number,
}.isRequired;
