import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

import heart from '../../../images/whiteHeartIcon.svg';
import fullHeart from '../../../images/blackHeartIcon.svg';

function FavoriteIcon({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const key = 'favoriteRecipes';
    const data = JSON.parse(localStorage.getItem(key)) || [];
    const findFavorite = data.find((item) => item.id === recipe.id);
    const bool = !!findFavorite;
    setIsFavorite(bool);
  }, [setIsFavorite, recipe]);

  const setLocalStorage = () => {
    const key = 'favoriteRecipes';
    const data = JSON.parse(localStorage.getItem(key));
    if (isFavorite) {
      const value = data.filter((item) => item.id !== recipe.id);
      localStorage.setItem(key, JSON.stringify(value));
      setIsFavorite(!isFavorite);
    } else {
      const value = data ? [...data, recipe] : [recipe];
      localStorage.setItem(key, JSON.stringify(value));
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <button type="button" onClick={ setLocalStorage }>
      <Image
        data-testid="favorite-btn"
        className="header-icon"
        src={ isFavorite ? fullHeart : heart }
        alt="heart-icon"
      />
    </button>
  );
}

FavoriteIcon.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default FavoriteIcon;
