import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';
import { fetchMealApi, fetchCategoriesMealApi } from '../services/fetchMealApi';
import fetchMealDetailsApi from '../services/fetchMealDetailsApi';

const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [foodDetailsId, setFoodDetailsId] = useState('');
  const [foodDetails, setFoodDetails] = useState([]);
  const [foodFilter, setFoodFilter] = useState({
    searchText: '',
    search: '',
  });
  const [categoriesMeal, setCategoriesMeal] = useState([]);
  const [mealsByCategories, setMealsByCategories] = useState(false);

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
    fetchMealDetailsApi(foodDetailsId).then((data) => setFoodDetails(data.meals));
  }, [foodDetailsId]);

  const contextValue = {
    foods,
    foodFilter,
    setFoodFilter,
    setFoods,
    foodDetailsId,
    setFoodDetailsId,
    foodDetails,
    categoriesMeal,
    mealsByCategories,
    setMealsByCategories,
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
