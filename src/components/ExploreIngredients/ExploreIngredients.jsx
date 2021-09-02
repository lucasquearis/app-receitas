import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ingredientImgUrl from '../../helpers/ingredientImgUrl';
import IngredientsCard from './IngredientsCard/IngredientsCard';

function ExploreIngredients({ path }) {
  const maxCards = 12;
  const ingredients = useSelector(({ meals }) => meals.ingredients);
  if (path === '/explorar/bebidas/ingredientes' && ingredients.drinks) {
    const ingList = ingredients.drinks.slice(0, maxCards);
    return (ingList.map(({ strIngredient1 }, i) => (
      <IngredientsCard
        path={ path }
        key={ i }
        data-testid={ `${i}-ingredient-card` }
        name={ strIngredient1 }
        i={ i }
        image={ ingredientImgUrl(strIngredient1, path) }
      />)));
  }
  if (path === '/explorar/comidas/ingredientes' && ingredients.meals) {
    const ingList = ingredients.meals.slice(0, maxCards);
    return (ingList.map(({ strIngredient }, i) => (
      <IngredientsCard
        path={ path }
        key={ i }
        name={ strIngredient }
        i={ i }
        image={ ingredientImgUrl(strIngredient, path) }
      />)));
  }
}

ExploreIngredients.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ExploreIngredients;
