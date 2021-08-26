import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import empty from '../images/whiteHeartIcon.svg';
import full from '../images/blackHeartIcon.svg';

function FavoriteButton({ recipeDetails }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  let recipeKey = 'Drink';
  if ('idMeal' in recipeDetails) recipeKey = 'Meal';

  const { strCategory: category } = recipeDetails;
  const id = recipeDetails[`id${recipeKey}`];
  const name = recipeDetails[`str${recipeKey}`];
  const image = recipeDetails[`str${recipeKey}Thumb`];
  let type = 'comida';
  let area = '';
  let alcoholicOrNot = '';
  if (recipeKey === 'Drink') {
    type = 'bebida';
    alcoholicOrNot = recipeDetails.strAlcoholic;
  } else area = recipeDetails.strArea;

  const entry = {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
  };

  useEffect(() => {
    const currentStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (currentStorage) {
      setFavoriteRecipes(currentStorage);
      const find = currentStorage.find((recipe) => recipe.id === id);
      if (find !== undefined) {
        setIsFavorite(true);
      }
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleFavorite = () => {
    const find = favoriteRecipes.find((recipe) => recipe.id === id);
    if (find === undefined) {
      setFavoriteRecipes([...favoriteRecipes, entry]);
      setIsFavorite(true);
    }
    if (find !== undefined) {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== id));
      setIsFavorite(false);
    }
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ handleFavorite }
      src={ isFavorite ? full : empty }
    >
      <img
        src={ isFavorite ? full : empty }
        alt={ isFavorite ? 'favorite' : 'not favorite' }
        style={ { width: '58px' } }
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  recipeDetails: Proptypes.objectOf(Proptypes.string).isRequired,
};

export default FavoriteButton;
