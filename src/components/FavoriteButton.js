import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import { checkFavoriteRecipes, formatFavoriteRecipe } from '../helpers';

const FavoriteButton = ({ recipe }) => {
  const [heartIcon, setHeartIcon] = useState(whiteHeart);
  const { id } = useParams();
  const favoriteRecipe = formatFavoriteRecipe(recipe);

  const saveFavoriteRecipe = (favorite) => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const updateStorage = [...favoriteRecipes, favorite];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updateStorage));
    }
  };

  const deleteFavoriteRecipe = (favorite) => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavorites = favoriteRecipes.filter((e) => e.id !== favorite.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  };

  const handleClick = () => {
    if (heartIcon === whiteHeart && !checkFavoriteRecipes(id)) {
      saveFavoriteRecipe(favoriteRecipe);
      setHeartIcon(blackHeart);
    }
    if (heartIcon === blackHeart && checkFavoriteRecipes(id)) {
      deleteFavoriteRecipe(favoriteRecipe);
      setHeartIcon(whiteHeart);
    }
  };

  useEffect(() => {
    if (checkFavoriteRecipes(id)) {
      setHeartIcon(blackHeart);
    } else {
      setHeartIcon(whiteHeart);
    }
  }, [id]);

  return (
    <input
      type="image"
      data-testid="favorite-btn"
      src={ heartIcon }
      alt="heart"
      className="favorite-btn"
      onClick={ handleClick }
    />
  );
};

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({}),
};

FavoriteButton.defaultProps = {
  recipe: {},
};

export default FavoriteButton;
