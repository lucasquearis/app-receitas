import React, { useState } from 'react';
import favoriteIconTransp from '../images/whiteHeartIcon.svg';
import favoriteIconFull from '../images/blackHeartIcon.svg';
import '../cssPages/ButtonFavorite.css';

function ButtonFavorite(data) {
  const { favoriteObject } = data;
  const { id: idRecipe } = favoriteObject;
  const favorites = localStorage.getItem('favoriteRecipes')
    ? localStorage.getItem('favoriteRecipes') : '';

  const [isFavorite, setIsFavorite] = useState(favorites.includes(idRecipe));

  const favoriteClick = () => {
    const oldFavorites = (favorites === '') ? [] : JSON.parse(favorites);
    if (isFavorite) {
      const newFavorites = [...oldFavorites].filter(({ id }) => id !== idRecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...oldFavorites, favoriteObject];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <button type="button" onClick={ favoriteClick }>
      <img
        src={ isFavorite ? favoriteIconFull : favoriteIconTransp }
        alt="Favorite"
        data-testid="favorite-btn"
      />
    </button>
  );
}

export default ButtonFavorite;
