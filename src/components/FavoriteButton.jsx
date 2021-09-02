import React, { Component } from 'react';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorito: false,
    };
    this.white = this.white.bind(this);
    this.black = this.black.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { favorito } = this.state;
    if (favorito) this.setState({ favorito: false });
    if (!favorito) this.setState({ favorito: true });
  }

  white() {
    const { favorito } = this.state;
    if (favorito === false) {
      return (
        <button
          type="button"
          className="share-fill"
          onClick={ this.handleClick }
        >
          <img
            src={ WhiteHeartIcon }
            alt="favorite button"
            data-testid="favorite-btn"
          />
        </button>
      );
    }
  }

  black() {
    const { favorito } = this.state;
    if (favorito === true) {
      return (
        <button
          type="button"
          className="share-fill"
          onClick={ this.handleClick }
        >
          <img
            src={ BlackHeartIcon }
            alt="favorite button"
            data-testid="favorite-btn"
          />
        </button>
      );
    }
  }

  render() {
    const blackButton = this.black();
    const whiteButton = this.white();
    const { favorito } = this.state;
    if (favorito === false) return whiteButton;
    if (favorito === true) return blackButton;
  }
}

export default FavoriteButton;
