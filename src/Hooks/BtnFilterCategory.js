import { useState, useEffect } from 'react';
import fetchApi from '../Helpers/fetchApi';

const BtnFilterCategory = () => {
  const [categoryMeal, setCategoryMeal] = useState();
  const [categoryDrinks, setCategoryDrinks] = useState();

  const urlMeal = 'https://www.themealdb.com/api/json/v1/1/';
  const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';

  useEffect(() => {
    const getCategoryMeal = async (url) => {
      const response = await fetchApi(url, 'list.php?c=list');
      setCategoryMeal(response.meals);
    };
    getCategoryMeal(urlMeal);
  }, []);

  useEffect(() => {
    const getCategoryDrinks = async (url) => {
      const response = await fetchApi(url, 'list.php?c=list');
      setCategoryDrinks(response.drinks);
    };
    getCategoryDrinks(urlDrinks);
  }, []);

  return {
    categoryDrinks,
    categoryMeal,
  };
};

export default BtnFilterCategory;
