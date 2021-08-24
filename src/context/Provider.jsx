import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Context from './Context';
import fetchAPI from '../services/fetchAPI';

export default function Provider({ children }) {
  const [dataMeals, setDataMeals] = useState('');
  const [dataDrinks, setDataDrinks] = useState('');
  const [categoryMeals, setCategoryMeals] = useState('');
  const [categoryDrinks, setCategoryDrinks] = useState('');

  // faz requisicao para mealsApi
  useEffect(() => {
    const getMealsApi = async () => {
      const result = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setDataMeals(result);
    };
    getMealsApi();
  }, []);

  // faz requisicao para drinksApi
  useEffect(() => {
    const getDrinksApi = async () => {
      const result = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setDataDrinks(result);
    };
    getDrinksApi();
  }, []);

  // faz requisicao para categorias da mealsApi
  useEffect(() => {
    const getMealCategoryApi = async () => {
      const result = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      setCategoryMeals(result);
    };
    getMealCategoryApi();
  }, []);

  // faz requisicao para categorias da drinksApi
  useEffect(() => {
    const getDrinkCategoryApi = async () => {
      const result = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      setCategoryDrinks(result);
    };
    getDrinkCategoryApi();
  }, []);

  const context = {
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    categoryMeals,
    categoryDrinks,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
