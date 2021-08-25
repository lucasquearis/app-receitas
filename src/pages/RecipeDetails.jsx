import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchFoodDetails, fetchDrinksDetails } from '../services/fechRecipes';
import FoodDetails from '../components/FoodDetails';
import DrinksDetails from '../components/DrinkDetails';

export default function RecipeDetails(props) {
  const { match: { params: { id }, url } } = props;
  const [foodDetails, setFoodDetails] = useState({ meals: [], food: false });
  const [drinkDetails, setDrinkDetails] = useState({ drinks: [], drink: false });
  useEffect(() => {
    if (url === `/comidas/${id}`) {
      fetchFoodDetails(setFoodDetails, id);
    } else { fetchDrinksDetails(setDrinkDetails, id); }
  }, []);
  const { meals, food } = foodDetails;
  const { drinks, drink } = drinkDetails;

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
        meal={ strMeal }
        thumb={ strMealThumb }
        category={ strCategory }
        instructions={ strInstructions }
        youTube={ strYoutube }
        ingredientEndMeasure={ ingredientEndMeasure }

      />
    );
  }

  if (url === `/bebidas/${id}` && drink) {
    const { strDrink, strDrinkThumb, strCategory,
      strInstructions, strAlcoholic } = drinks[0];
    const filterIngredients = Object.entries(drinks[0])
      .filter((item) => item[0].includes('Ingredient'))
      .map((item) => item[1]).filter((item) => item !== '' && item !== null);

    const filterMeasure = Object.entries(drinks[0])
      .filter((item) => item[0].includes('Measure'))
      .map((item) => item[1]).filter((item) => item !== '' && item !== null);

    const ingredientEndMeasure = [[...filterIngredients], [...filterMeasure]];
    return (
      <DrinksDetails
        drink={ strDrink }
        thumb={ strDrinkThumb }
        category={ strCategory }
        instructions={ strInstructions }
        ingredientEndMeasure={ ingredientEndMeasure }
        alcoholic={ strAlcoholic }

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
