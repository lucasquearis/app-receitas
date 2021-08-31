import React, { useState, useEffect } from 'react';
import { string, shape, bool, number, func } from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import handleFavorites from '../../helpers/handleFavorites';

export default function HandleFavoriteAndShare(
  { id,
    recipe,
    isFood,
    index,
    removeFavorite,
  },
) {
  const [copyMsg, setCopyMsg] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);
  const type = isFood ? 'comida' : 'bebida';
  const setFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isFavorite = favoriteRecipes
      ? favoriteRecipes.some((item) => (item.id === id))
      : false;
    setFavoriteRecipe(isFavorite);
  };

  useEffect(setFavorite);

  const handleShare = () => {
    const url = window.location.href;
    const newUrl = url.replace('/receitas-favoritas', `/${type}s/${id}`)
      .replace('/receitas-feitas', `/${type}s/${id}`);
    copy(newUrl);
    setCopyMsg(true);
  };

  const COPY_MSG = 'Link copiado!';
  return (
    <div>
      <button
        type="button"
        className="share-btn"
        onClick={ handleShare }
        data-testid="share-btn"
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share icon"
        />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        className="favorite-btn"
        onClick={ () => {
          handleFavorites(recipe, isFood);
          setFavoriteRecipe(!favoriteRecipe);
          removeFavorite();
        } }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
        />
      </button>
      {(copyMsg) ? <p>{COPY_MSG}</p> : ''}
    </div>
  );
}

HandleFavoriteAndShare.propTypes = {
  id: string.isRequired,
  recipe: shape().isRequired,
  isFood: bool,
  index: number.isRequired,
  removeFavorite: func,
};

HandleFavoriteAndShare.defaultProps = {
  isFood: false,
  removeFavorite: () => {},
};
