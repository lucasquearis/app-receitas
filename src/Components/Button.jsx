import React from 'react';
import { bool, func } from 'prop-types';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function Button({ favorite, handleFavorite, handleShare }) {
  return (
    <>
      <button
        type="button"
        onClick={ handleShare }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="To share"
        />
      </button>
      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeart : whiteHeart }
          alt="Favorite"
        />
      </button>
    </>
  );
}

Button.propTypes = {
  favorite: bool.isRequired,
  handleFavorite: func.isRequired,
  handleShare: func.isRequired,
};
export default Button;
