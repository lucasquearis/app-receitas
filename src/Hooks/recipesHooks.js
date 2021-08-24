import { useState } from 'react';
import fetchApi from '../Helpers/fetchApi';

function RecipesHooks() {
  const [recipes, setRecipes] = useState([]);

  const showAlert = (callback, msg) => {
    callback(msg);
  };

  const searchRecipes = async (previousSearch, currentRout, url, history) => {
    const { type, input } = previousSearch;
    let response;
    switch (type) {
    case 'name':
      response = await fetchApi(url, 'search.php?s=', input);
      break;
    case 'ingredient':
      response = await fetchApi(url, 'filter.php?i=', input);
      break;
    case 'first-letter':
      if (input.length > 1) {
        return showAlert(alert, 'Sua busca deve conter somente 1 (um) caracter');
      }
      response = await fetchApi(url, 'search.php?f=', input);
      break;
    default:
      break;
    }

    const responseRecipes = currentRout === true ? response.meals : response.drinks;
    setRecipes(responseRecipes);

    if (responseRecipes.length === 1) {
      history.push(
        currentRout === true
          ? `/comidas/${responseRecipes[0].idMeal}`
          : `/bebidas/${responseRecipes[0].idDrink}`,
      );
    }
  };

  return {
    searchRecipes,
    recipes,
  };
}

export default RecipesHooks;
