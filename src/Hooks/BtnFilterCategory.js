import { useState, useEffect } from 'react';
import fetchApi from '../Helpers/fetchApi';

const BtnFilterCategory = () => {
  const [categoryMeal, setCategoryMeal] = useState();
  const [categoryDrinks, setCategoryDrinks] = useState();
  const [filter, setFilter] = useState('');

  const urlMeal = 'https://www.themealdb.com/api/json/v1/1/';
  const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/';
  // const urlMealCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef';
  // const urlDrinksCategory = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';

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

  const filterIngredient = ({ target: { value } }) => {
    setFilter(value);
  };

  return {
    categoryDrinks,
    categoryMeal,
    filterIngredient,
    filter,
  };
};

export default BtnFilterCategory;
