import { useContext } from 'react';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

export function useFetchCategoryApiMeals() {
  const { setBtnCategoryMeals } = useContext(Context);

  // faz requisicao para receber os botoes de categorias da mealsApi
  const getCategoryMealsApi = async () => {
    const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    setBtnCategoryMeals(meals);
  };
  return [getCategoryMealsApi];
}

export function useFetchCategoryApiDrinks() {
  const { setBtnCategoryDrinks } = useContext(Context);

  // faz requisicao para receber os botoes de categorias da drinksApi
  const getCategoryDrinkApi = async () => {
    const { drinks } = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    setBtnCategoryDrinks(drinks);
  };
  return [getCategoryDrinkApi];
}
