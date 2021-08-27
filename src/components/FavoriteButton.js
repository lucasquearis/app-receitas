import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import { checkFavoriteRecipes, formatFavoriteRecipe } from '../helpers';

const FavoriteButton = ({ recipe, id, horizontal, index }) => {
  const [heartIcon, setHeartIcon] = useState(whiteHeart);
  const { favoriteRcps, setFavoriteRcps } = useContext(AppContext);
  // const { id } = useParams();
  const favoriteRecipe = formatFavoriteRecipe(recipe);

  const saveFavoriteRecipe = (favorite) => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const updateStorage = [...favoriteRecipes, favorite];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updateStorage));
      setFavoriteRcps([
        ...favoriteRcps,
        { ...formatFavoriteRecipe(recipe) },
      ]);
    }
  };

  const deleteFavoriteRecipe = (favorite) => {
    if (localStorage.favoriteRecipes) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const newFavorites = favoriteRecipes.filter((e) => e.id !== favorite.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setFavoriteRcps([
        ...favoriteRcps.filter((rcp) => rcp.id !== favorite.id),
      ]);
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
      data-testid={ horizontal ? `${index}-horizontal-favorite-btn` : 'favorite-btn' }
      src={ heartIcon }
      alt="heart"
      className="favorite-btn"
      onClick={ handleClick }
    />
  );
};

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({}),
  id: PropTypes.number.isRequired,
  horizontal: PropTypes.bool,
  index: PropTypes.number,
};

FavoriteButton.defaultProps = {
  recipe: {},
  horizontal: false,
  index: 0,
};

export default FavoriteButton;
