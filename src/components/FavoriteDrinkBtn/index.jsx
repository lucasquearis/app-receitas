import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { myFavoriteRecipe } from '../../services';

function FavoriteDrinkBtn({ dataId, details, alt }) {
  const [favorite, setFavorite] = useState(false);

  const drinkDetails = details.drinks[0];

  const checkRecipeName = useCallback(() => {
    const favRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipe) {
      const favName = favRecipe.some(({ name }) => (
        name === drinkDetails.strDrink));
      if (favName) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  }, [drinkDetails.strDrink]);

  useEffect(() => {
    checkRecipeName();
  }, [checkRecipeName]);

  const favoriteRecipes = {
    id: drinkDetails.idDrink,
    type: 'bebida',
    area: '',
    category: drinkDetails.strCategory,
    alcoholicOrNot: drinkDetails.strAlcoholic,
    name: drinkDetails.strDrink,
    image: drinkDetails.strDrinkThumb,
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

FavoriteDrinkBtn.propTypes = {
  onClick: PropTypes.func,
  dataId: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
}.isRequired;

export default FavoriteDrinkBtn;
