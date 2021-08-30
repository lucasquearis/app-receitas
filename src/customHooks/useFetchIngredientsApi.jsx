import { useContext } from 'react';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

export function useFetchIngredientsApiMeals() {
  const { setDataExploreIngredientsMeals } = useContext(Context);

  // faz requisicao para receber a lista de ingredientes da mealsApi
  const getIngredientsMealsApi = async () => {
    const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    setDataExploreIngredientsMeals(meals);
  };
  return [getIngredientsMealsApi];
}

export function useFetchIngredientsApiDrinks() {
  const { setDataExploreIngredientsDrinks } = useContext(Context);

  // faz requisicao para receber a lista de ingredientes da drinksApi
  const getIngredientsDrinksApi = async () => {
    const { drinks } = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    setDataExploreIngredientsDrinks(drinks);
  };
  return [getIngredientsDrinksApi];
}
