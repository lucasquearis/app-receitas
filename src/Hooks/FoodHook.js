import { useState, useEffect } from 'react';
import fetchApi from '../Helpers/fetchApi';

const Food = () => {
  const [drinks, setDrinks] = useState();
  const [meal, setMeal] = useState();

  const urlMeal = 'https://www.themealdb.com/api/json/v1/1/';
  const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';

  useEffect(() => {
    const getFoodMeal = async (url) => {
      const response = await fetchApi(url, 'search.php?s=');
      setMeal(response.meals);
    };
    getFoodMeal(urlMeal);
  }, []);

  useEffect(() => {
    const getFoodDrinks = async (url) => {
      const response = await fetchApi(url, 'search.php?s=');
      setDrinks(response.drinks);
    };
    getFoodDrinks(urlDrinks);
  }, []);

  return {
    drinks,
    meal,
  };
};

export default Food;
