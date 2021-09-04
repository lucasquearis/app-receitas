import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FavoriteButton = (props) => {
  const {
    id,
    type,
    area = '',
    category = '',
    alcoholicOrNot = '',
    name,
    image,
    favoriteRecipe,
    setFavoriteRecipe,
  } = props;

  const handleClick = () => {
    const parseLocalStorage = JSON
      .parse(localStorage
        .getItem('favoriteRecipes')) || [];
    const verifyFavorite = parseLocalStorage.some((item) => item.id === id);
    setFavoriteRecipe(verifyFavorite);
    if (!favoriteRecipe) {
      const defaultRecipe = {
        id,
        type,
        area,
        category,
        alcoholicOrNot,
        name,
        image,
      };
      setFavoriteRecipe(true);
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify([...parseLocalStorage, defaultRecipe]));
    } else {
      const removeFavorite = parseLocalStorage.filter((recipe) => recipe.id !== id);
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify([...removeFavorite]));
      setFavoriteRecipe(false);
    }
  };
  return (
    <button
      className="favorite-btn"
      type="button"
      onClick={
        () => handleClick()
      }
    >
      <img
        data-testid="favorite-btn"
        src={ favoriteRecipe ? blackHeartIcon : whiteHeartIcon }
        alt="icone favorito"
      />
    </button>
  );
};

FavoriteButton.propTypes = {
  handleClick: PropTypes.func,
  alcoholic: PropTypes.string,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
  category: PropTypes.string,
  favoriteRecipe: PropTypes.bool,
}.isRequired;

export default FavoriteButton;
