import React from 'react';
import PropTypes from 'prop-types';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButtonIcon({ isFavorite, removeFavorite, newFavorite }) {
  return (
    <button
      onClick={ isFavorite ? () => removeFavorite() : () => newFavorite() }
      type="button"
      data-testid="favorite-btn"
      src={ (isFavorite ? blackHeartIcon : whiteHeartIcon) }
    >
      <img
        src={ (isFavorite ? blackHeartIcon : whiteHeartIcon) }
        alt="Favorite Recipe Action"
      />
    </button>
  );
}

FavoriteButtonIcon.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  newFavorite: PropTypes.func.isRequired,
};

export default FavoriteButtonIcon;
