import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import {
  fetchApi,
  MEALS_LIST,
  DRINKS_LIST,
  MEALS_CATEGORIES,
  DRINKS_CATEGORIES,
} from '../services';

function Provider({ children }) {
  const [mealsList, setMealsList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const getRecipes = async () => {
      const recipesListLimit = 12;

      try {
        const { meals } = await fetchApi(MEALS_LIST);
        setMealsList(meals.filter((_meal, index) => index < recipesListLimit));

        const { drinks } = await fetchApi(DRINKS_LIST);
        setDrinksList(drinks.filter((_drink, index) => index < recipesListLimit));
      } catch (error) {
        console.log(error);
      }
    };

    const getCategories = async () => {
      const categoriesListLimit = 5;

      try {
        const mealsCategoriesData = await fetchApi(MEALS_CATEGORIES);
        setMealsCategories(mealsCategoriesData.meals
          .filter((_meal, index) => index < categoriesListLimit));

        const drinksCategoriesData = await fetchApi(DRINKS_CATEGORIES);
        setDrinksCategories(drinksCategoriesData.drinks
          .filter((_drink, index) => index < categoriesListLimit));
      } catch (error) {
        console.log(error);
      }
    };

    getRecipes();
    getCategories();
  }, []);

  const contextValue = {
    mealsList,
    drinksList,
    showBar,
    setShowBar,
    mealsCategories,
    drinksCategories,
  };
  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
