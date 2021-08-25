import { useContext, useEffect } from 'react';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

export function useFetchCategoryListApiMeals() {
  const { setDataMeals, listCategoryMeals } = useContext(Context);

  // faz requisicao para receber a lista de cada categoria da mealsApi
  useEffect(() => {
    const getListCategoryMealApi = async () => {
      const { meals } = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${listCategoryMeals}`);
      setDataMeals(meals);
    };
    getListCategoryMealApi();
  }, [setDataMeals, listCategoryMeals]);
}

export function useFetchCategoryListApiDrinks() {
  const { setDataDrinks, listCategoryDrinks } = useContext(Context);

  // faz requisicao para receber a lista de cada categoria da drinksApi
  useEffect(() => {
    const getListCategoryDrinkApi = async () => {
      const { drinks } = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${listCategoryDrinks}`);
      setDataDrinks(drinks);
    };
    getListCategoryDrinkApi();
  }, [setDataDrinks, listCategoryDrinks]);
}
