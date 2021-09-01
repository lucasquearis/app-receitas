import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import {
  fetchMealApi,
  fetchCategoriesMealApi,
  fetchIngredients,
  fetchMealByArea,
} from '../services/fetchMealApi';
import { fetchDrinksApi,
  fetchCategoriesDrinksApi } from '../services/fetchDrinksApi';

const Provider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [foodDetails, setFoodDetails] = useState([]);
  const [foodFilter, setFoodFilter] = useState({
    searchText: '',
    search: '',
  });
  const [categoriesMeal, setCategoriesMeal] = useState([]);
  const [mealsByCategories, setMealsByCategories] = useState(false);
  const [randomMeal, setRandomMeal] = useState('');
  const [changed, setChanged] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [areas, setAreas] = useState([]);

  const [drinks, setDrinks] = useState([]);
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [drinkFilter, setDrinkFilter] = useState({
    searchText: '',
    search: '',
  });
  const [categoriesDrinks, setCategoriesDrinks] = useState([]);
  const [drinksByCategories, setDrinksByCategories] = useState(false);
  const [randomDrinks, setRandomDrinks] = useState('');

  useEffect(() => {
    fetchMealApi(foodFilter).then((data) => {
      setFoods(data.meals);
    });
  }, [foodFilter]);

  useEffect(() => {
    fetchCategoriesMealApi().then((category) => {
      setCategoriesMeal(category.meals);
    });
  }, []);

  useEffect(() => {
    fetchIngredients().then((data) => {
      setIngredients(data.meals);
    });
  }, []);

  useEffect(() => {
    fetchMealByArea().then((data) => {
      setAreas(data.meals);
    });
  }, []);

  useEffect(() => {
    fetchDrinksApi(drinkFilter).then((data) => {
      setDrinks(data.drinks);
    });
  }, [drinkFilter]);

  useEffect(() => {
    fetchCategoriesDrinksApi().then((categories) => {
      setCategoriesDrinks(categories.drinks);
    });
  }, []);

  useEffect(() => {
    fetchIngredients().then((data) => {
      setIngredients(data.drinks);
    });
  }, []);

  const contextValue = {
    foods,
    foodFilter,
    setFoodFilter,
    setFoods,
    setFoodDetails,
    foodDetails,
    categoriesMeal,
    mealsByCategories,
    setMealsByCategories,
    randomMeal,
    setRandomMeal,
    changed,
    setChanged,
    ingredients,
    areas,
    drinks,
    drinkDetails,
    setDrinkDetails,
    drinkFilter,
    setDrinkFilter,
    categoriesDrinks,
    setDrinks,
    drinksByCategories,
    setDrinksByCategories,
    randomDrinks,
    setRandomDrinks,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
