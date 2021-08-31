import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FavoritesContext from '../context/FavoritesContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function UnfavoriteButton({ recipe, index }) {
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const [isFavorite, setIsFavorite] = useState(
    favorites.map((fav) => fav.id).includes(recipe.id),
  );

  function handleFavoriteClick() {
    const updatedFavorites = favorites.filter(
      (fav) => fav.id !== (recipe.id),
    );
    setFavorites(updatedFavorites);
  }
  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const isFavoriteLS = favoriteRecipes.map((fav) => fav.id).includes(recipe.id);
      if (isFavoriteLS) setIsFavorite(true);
    }
  }, [recipe]);

  return (
    <button
      type="button"
      onClick={ () => {
        setIsFavorite(!isFavorite);
        handleFavoriteClick();
      } }
    >
      <img
        data-testid={ `${index}-horizontal-favorite-btn` }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favoritar"
      />
    </button>
  );
}

UnfavoriteButton.propTypes = {
  recipe: PropTypes.shape({}),
  isFood: PropTypes.bool,
}.isRequired;
