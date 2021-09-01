import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const getFavorite = (foodOrDrink, whichOne) => {
  const getFavoriteDrink = (drink) => ({
    id: drink.idDrink,
    area: '',
    type: 'bebida',
    alcoholicOrNot: drink.strAlcoholic,
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    category: drink.strCategory,
  });

  const getFavoriteFood = (food) => ({
    alcoholicOrNot: '',
    id: food.idMeal,
    type: 'comida',
    area: food.strArea,
    category: food.strCategory,
    name: food.strMeal,
    image: food.strMealThumb,
  });

  if (whichOne === 'idMeal') {
    return getFavoriteFood(foodOrDrink);
  }
  if (whichOne === 'idDrink') {
    return getFavoriteDrink(foodOrDrink);
  }
};

const whichOne = (foodOrDrink) => {
  if (foodOrDrink.idMeal) {
    return 'idMeal';
  }
  if (foodOrDrink.idDrink) {
    return 'idDrink';
  }
};

function FavoriteButton(props) {
  const { foodOrDrink, dataTestId, loadFavoritesCB = () => {} } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const lastSaveFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const favoriteFound = lastSaveFavorite
      .find((recipe) => recipe.id === foodOrDrink.idMeal
        || recipe.id === foodOrDrink.idDrink);
    if (favoriteFound) {
      setIsFavorite(Object.values(favoriteFound)[0]);
    }
  }, [foodOrDrink.idMeal, foodOrDrink.idDrink]);

  const saveFavorite = (lastSave, whichOfThem) => {
    if (lastSave.find((recipe) => recipe.id === foodOrDrink[whichOfThem])) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        lastSave.filter((recipe) => recipe.id !== foodOrDrink[whichOfThem]),
      ));
      setIsFavorite(false);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...lastSave, getFavorite(foodOrDrink, whichOfThem)],
      ));
      setIsFavorite(true);
    }
  };

  const handleFavorite = () => {
    const lastSave = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    saveFavorite(lastSave, whichOne(foodOrDrink));
    loadFavoritesCB();
  };

  return (
    <button
      type="button"
      onClick={ handleFavorite }
    >
      <img
        data-testid={ dataTestId }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Botão para adicionar ou retirar esta receita dos favoritos"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  foodOrDrink: PropTypes.shape().isRequired,
  dataTestId: PropTypes.string.isRequired,
  loadFavoritesCB: PropTypes.func.isRequired,
};

export default FavoriteButton;
