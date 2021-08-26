import { useContext, useEffect } from 'react';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

export function useFetchCategoryListApiMeals() {
  const { setDataMeals, listCategoryMeals } = useContext(Context);

  // faz requisicao para receber a lista de cada categoria da mealsApi
  useEffect(() => {
    // logica para passar no requisito 31 de meals
    let END_POINT = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${listCategoryMeals}`;
    if (listCategoryMeals === 'All') {
      END_POINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }

    const getListCategoryMealApi = async () => {
      const { meals } = await fetchAPI(END_POINT);
      setDataMeals(meals);
    };
    getListCategoryMealApi();
  }, [setDataMeals, listCategoryMeals]);
}

export function useFetchCategoryListApiDrinks() {
  const { setDataDrinks, listCategoryDrinks } = useContext(Context);

  // faz requisicao para receber a lista de cada categoria da drinksApi
  useEffect(() => {
    // logica para passar no requisito 31 de drinks
    let END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${listCategoryDrinks}`;
    if (listCategoryDrinks === 'All') {
      END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    }

    const getListCategoryDrinkApi = async () => {
      const { drinks } = await fetchAPI(END_POINT);
      setDataDrinks(drinks);
    };
    getListCategoryDrinkApi();
  }, [setDataDrinks, listCategoryDrinks]);
}
