import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';
import {
  fetchMealApi,
  fetchCategoriesMealApi,
  fetchIngredients,
} from '../services/fetchMealApi';

const FoodProvider = ({ children }) => {
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
  };
  return (
    <FoodContext.Provider value={ contextValue }>
      {children}
    </FoodContext.Provider>
  );
};

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodProvider;
