import { useContext } from 'react';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

export function useFetchCategoryListApiMeals() {
  const { setDataMeals, listCategoryMeals } = useContext(Context);

  // faz requisicao para receber a lista de cada categoria da mealsApi
  let END_POINT = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${listCategoryMeals}`;
  if (listCategoryMeals === 'All') {
    END_POINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  }
  const getListCategoryMealApi = async () => {
    const { meals } = await fetchAPI(END_POINT);
    setDataMeals(meals);
  };
  return [getListCategoryMealApi];
}

export function useFetchCategoryListApiDrinks() {
  const { setDataDrinks, listCategoryDrinks } = useContext(Context);

  // faz requisicao para receber a lista de cada categoria da drinksApi
  let END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${listCategoryDrinks}`;
  if (listCategoryDrinks === 'All') {
    END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }
  const getListCategoryDrinkApi = async () => {
    const { drinks } = await fetchAPI(END_POINT);
    setDataDrinks(drinks);
  };
  return [getListCategoryDrinkApi];
}
