import { useState } from 'react';
import fetchApi from '../Helpers/fetchApi';

const urlMeal = 'https://www.themealdb.com/api/json/v1/1/';
const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';

const SingleRecipeHook = () => {
  const [singleRecipe, setSingleRecipe] = useState('');

  const handleRecipe = async ({ feedType, id }) => {
    if (feedType === 'comidas') {
      const meal = await fetchApi(urlMeal, 'lookup.php?i=', id);
      setSingleRecipe(meal.meals[0]);
    } else {
      const drink = await fetchApi(urlDrinks, 'lookup.php?i=', id);
      setSingleRecipe(drink.drinks[0]);
    }
  };
  return {
    singleRecipe,
    handleRecipe,
  };
};

export default SingleRecipeHook;
