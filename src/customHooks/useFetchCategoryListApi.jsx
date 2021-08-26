import { useContext } from 'react';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

export function useFetchCategoryListApiMeals() {
  const { setDataMeals, listCategoryMeals } = useContext(Context);

  // faz requisicao para receber a lista de cada categoria da mealsApi
  const getListCategoryMealApi = async () => {
    const { meals } = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${listCategoryMeals}`);
    setDataMeals(meals);
  };
  return [getListCategoryMealApi];
}

export function useFetchCategoryListApiDrinks() {
  const { setDataDrinks, listCategoryDrinks } = useContext(Context);

  // faz requisicao para receber a lista de cada categoria da drinksApi
  const getListCategoryDrinkApi = async () => {
    const { drinks } = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${listCategoryDrinks}`);
    setDataDrinks(drinks);
  };
  return [getListCategoryDrinkApi];
}
