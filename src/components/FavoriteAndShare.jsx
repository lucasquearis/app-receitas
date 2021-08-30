import React, { useState, useEffect } from 'react';
import { string, shape, bool } from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import handleFavorites from '../helpers/handleFavorites';

export default function FavoriteAndShare({ id, recipe, isFood }) {
  const [copyMsg, setCopyMsg] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteRecipe, setFavoriteRecipe] = useState(false);

  const setFavorite = () => {
    if (!isMounted) {
      const type = isFood ? 'comida' : 'bebida';
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const isFavorite = favoriteRecipes
        ? favoriteRecipes.some((item) => (item.id === id && item.type === type))
        : false;
      setFavoriteRecipe(isFavorite);
      setIsMounted(true);
    }
  };

  useEffect(setFavorite);

  const handleShare = () => {
    const url = window.location.href;
    copy(url);
    setCopyMsg(true);
  };

  const COPY_MSG = 'Link copiado!';

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        className="share-btn"
        onClick={ handleShare }
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button
        type="button"
        className="favorite-btn"
        onClick={ () => {
          handleFavorites(recipe, isFood);
          setFavoriteRecipe(!favoriteRecipe);
        } }
      >
        <img
          data-testid="favorite-btn"
          src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
          alt="favorite icon"
        />
      </button>
      {(copyMsg) ? <p>{COPY_MSG}</p> : ''}
    </div>
  );
}

FavoriteAndShare.propTypes = {
  id: string.isRequired,
  recipe: shape().isRequired,
  isFood: bool,
};

FavoriteAndShare.defaultProps = {
  isFood: false,
};
