import { useState } from 'react';
import fetchApi from '../Helpers/fetchApi';

function IngredientHooks() {
  const [ingredients, setIngredients] = useState([]);
  const maxIngredients = 12;

  const getIngredients = async (route) => {
    if (route.includes('comidas')) {
      const response = await fetchApi('https://www.themealdb.com/api/json/v1/1/', 'list.php?i=list');
      const allIngredients = [];
      response.meals.splice(0, maxIngredients).map(async (current) => {
        const ingredient = {
          name: current.strIngredient,
          image: `https://www.themealdb.com/images/ingredients/${current.strIngredient}.png`,
        };
        return allIngredients.push(ingredient);
      });
      return setIngredients(allIngredients);
    }
    const response = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/', 'list.php?i=list');
    const allIngredients = [];
    response.drinks.splice(0, maxIngredients).map(async (current) => {
      const ingredient = {
        name: current.strIngredient1,
        image: `https://www.thecocktaildb.com/images/ingredients/${current.strIngredient1}.png`,
      };
      return allIngredients.push(ingredient);
    });
    return setIngredients(allIngredients);
  };

  return {
    ingredients,
    getIngredients,
  };
}

export default IngredientHooks;
