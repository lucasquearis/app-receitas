import { useContext } from 'react';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

export function useFetchApiMeals() {
  const { setDataMeals } = useContext(Context);

  // faz requisicao para receber a lista principal da mealsApi
  const getMealsApi = async () => {
    const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    setDataMeals(meals);
    console.log(meals);
  };
  return [getMealsApi];
}

export function useFetchApiDrinks() {
  const { setDataDrinks } = useContext(Context);

  // faz requisicao para receber a lista principal da drinksApi
  const getDrinksApi = async () => {
    const { drinks } = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    setDataDrinks(drinks);
  };
  return [getDrinksApi];
}
