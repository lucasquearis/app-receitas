import { useContext } from 'react';
import Context from '../context/Context';
import fetchAPI from '../services/fetchAPI';

export function useFetchRandomApiMeals() {
  const { setDataRandomMeals } = useContext(Context);

  // faz requisicao para receber os detalhes de 1 comida aleatoria da mealsApi
  const getRandomMealsApi = async () => {
    const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/random.php');
    setDataRandomMeals(meals);
  };
  return [getRandomMealsApi];
}

export function useFetchRandomApiDrinks() {
  const { setDataRandomDrinks } = useContext(Context);

  // faz requisicao para receber os detalhes de 1 bebida aleatoria da drinksApi
  const getRandomDrinksApi = async () => {
    const { drinks } = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    setDataRandomDrinks(drinks);
  };
  return [getRandomDrinksApi];
}
