import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import recepieContext from './Context';
import { fetchMeals, fetchDrinks } from '../services/fechRecipes';
import fetchCategories from '../services/fetchCategories';

export default function Provider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [mealCategories, setMealCategories] = useState([]);
  const [drinksCategoryFilter, setDrinksCategoryFilter] = useState();
  const [mealsCategoryFilter, setMealsCategoryFilter] = useState();

  useEffect(() => {
    fetchCategories(setDrinkCategories, 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', false);
    fetchCategories(setMealCategories, 'https://www.themealdb.com/api/json/v1/1/list.php?c=list', true);
  }, []);

  useEffect(() => {
    if (!mealsCategoryFilter) {
      fetchMeals(setMeals);

      return;
    }
    fetchMeals(
      setMeals, `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealsCategoryFilter}`,
    );
  }, [mealsCategoryFilter]);

  useEffect(() => {
    if (!drinksCategoryFilter) {
      fetchDrinks(setDrinks);
      return;
    }
    fetchDrinks(
      setDrinks, `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinksCategoryFilter}`,
    );
  }, [drinksCategoryFilter]);

  const defaultValue = {
    setMeals,
    setDrinks,
    setDrinksCategoryFilter,
    setMealsCategoryFilter,
    drinkCategories,
    mealCategories,
    meals,
    drinks,
  };
  return (
    <recepieContext.Provider value={ defaultValue }>
      {children}
    </recepieContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
