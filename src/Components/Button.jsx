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
        data-testid="share-btn"
        onClick={ handleShare }
      >
        { shareIcon }
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
      >
        { !favorite ? whiteHeart : blackHeart }
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
