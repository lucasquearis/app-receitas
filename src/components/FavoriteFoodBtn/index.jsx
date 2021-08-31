import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { myFavoriteRecipe } from '../../services';

function FavoriteFoodBtn({ dataId, details, alt }) {
  const [favorite, setFavorite] = useState(false);

  const foodDetails = details.meals[0];

  const checkRecipeName = useCallback(() => {
    const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipe) {
      const favName = favRecipe.some(({ name }) => (
        name === foodDetails.strMeal));
      if (favName) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  }, [foodDetails.strMeal]);

  useEffect(() => {
    checkRecipeName();
  }, [checkRecipeName]);

  const favoriteRecipes = {
    id: foodDetails.idMeal,
    type: 'comida',
    area: foodDetails.strArea,
    category: foodDetails.strCategory,
    alcoholicOrNot: '',
    name: foodDetails.strMeal,
    image: foodDetails.strMealThumb,
  };

  return (
    <button
      type="button"
      onClick={ () => setFavorite(myFavoriteRecipe(favoriteRecipes)) }
    >
      <img
        data-testid={ dataId }
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        alt={ alt }
      />
    </button>
  );
}

FavoriteFoodBtn.propTypes = {
  onClick: PropTypes.func,
  dataId: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
}.isRequired;

export default FavoriteFoodBtn;
