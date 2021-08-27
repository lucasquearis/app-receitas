import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../context/FoodContext';
import { fetchFoods, fetchFoodCategories } from '../services/mealAPI';

export default function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchFoods().then((data) => {
      setFoods(data.meals);
    });
    fetchFoodCategories().then((data) => {
      setCategories(data.meals);
    });
  }, []);

  return (
    <FoodContext.Provider
      value={ {
        foods,
        setFoods,
        categories,
        setCategories,
      } }
    >
      {children}
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
