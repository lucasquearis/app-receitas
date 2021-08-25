import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Context from './Context';
import fetchAPI from '../services/fetchAPI';

export default function Provider({ children }) {
  const [dataMeals, setDataMeals] = useState('');
  const [dataDrinks, setDataDrinks] = useState('');
  const [btnCategoryMeals, setBtnCategoryMeals] = useState('');
  const [btnCategoryDrinks, setBtnCategoryDrinks] = useState('');
  const [listCategoryMeals, setListCategoryMeals] = useState();
  const [listCategoryDrinks, setListCategoryDrinks] = useState();

  // faz requisicao para receber a lista principal da mealsApi
  useEffect(() => {
    const getMealsApi = async () => {
      const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setDataMeals(meals);
    };
    getMealsApi();
  }, []);

  // faz requisicao para receber a lista principal da drinksApi
  useEffect(() => {
    const getDrinksApi = async () => {
      const { drinks } = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      setDataDrinks(drinks);
    };
    getDrinksApi();
  }, []);

  // faz requisicao para receber os botoes de categorias da mealsApi
  useEffect(() => {
    const getCategoryMealApi = async () => {
      const { meals } = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      setBtnCategoryMeals(meals);
    };
    getCategoryMealApi();
  }, []);

  // faz requisicao para receber os botoes de categorias da drinksApi
  useEffect(() => {
    const getCategoryDrinkApi = async () => {
      const { drinks } = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      setBtnCategoryDrinks(drinks);
    };
    getCategoryDrinkApi();
  }, []);

  // faz requisicao para receber a lista de cada categoria da mealsApi
  useEffect(() => {
    const getListCategoryMealApi = async () => {
      const { meals } = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${listCategoryMeals}`);
      setDataMeals(meals);
    };
    getListCategoryMealApi();
  }, [listCategoryMeals]);

  // faz requisicao para receber a lista de cada categoria da drinksApi
  useEffect(() => {
    const getListCategoryDrinkApi = async () => {
      const { drinks } = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${listCategoryDrinks}`);
      setDataDrinks(drinks);
    };
    getListCategoryDrinkApi();
  }, [listCategoryDrinks]);

  const context = {
    dataMeals,
    setDataMeals,
    dataDrinks,
    setDataDrinks,
    btnCategoryMeals,
    btnCategoryDrinks,
    setListCategoryMeals,
    setListCategoryDrinks,
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
