import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';
import { fetchMealApi, fetchCategoriesMealApi } from '../services/fetchMealApi';

const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [categoriesMeal, setCategoriesMeal] = useState([]);

  useEffect(() => {
    fetchMealApi().then((data) => {
      setFoods(data.meals);
    });
  }, []);

  useEffect(() => {
    fetchCategoriesMealApi().then((category) => {
      setCategoriesMeal(category.meals);
    });
  }, []);

  const contextValue = {
    foods,
    setFoods,
    categoriesMeal,
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
