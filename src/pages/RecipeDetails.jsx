import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchFoodDetails } from '../services/fechRecipes';
import FoodDetails from '../components/FoodDetails';

export default function RecipeDetails(props) {
  const { match: { params: { id }, url } } = props;
  const [foodDetails, setFoodDetails] = useState({ meals: [], food: false });
  useEffect(() => {
    fetchFoodDetails(setFoodDetails, id);
  }, []);
  const { meals, food } = foodDetails;

  if (url === `/comidas/${id}` && food) {
    const { strMeal, strMealThumb, strCategory,
      strInstructions, strYoutube } = meals[0];
    const filterIngredients = Object.entries(meals[0])
      .filter((item) => item[0].includes('Ingredient'))
      .map((item) => item[1]).filter((item) => item !== '' && item.length > 0);

    const filterMeasure = Object.entries(meals[0])
      .filter((item) => item[0].includes('Measure'))
      .map((item) => item[1]).filter((item) => item !== ' ' && item.length > 0);
    const ingredientEndMeasure = [[...filterIngredients], [...filterMeasure]];
    return (
      <FoodDetails
        mealOrDrink={ strMeal }
        thumb={ strMealThumb }
        category={ strCategory }
        instructions={ strInstructions }
        youTube={ strYoutube }
        ingredientEndMeasure={ ingredientEndMeasure }

      />
    );
  }

  return (null);
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};
