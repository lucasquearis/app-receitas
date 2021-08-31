import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';
import { fetchInicialFoods, fetchFoodCategories } from '../services/mealAPI';

function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [foodCategories, setfoodCategories] = useState([]);
  const [foodRandom, setFoodRandom] = useState(0);

  useEffect(() => {
    fetchInicialFoods().then(({ meals }) => setFoods(meals));
    fetchFoodCategories().then(({ meals }) => setfoodCategories(meals));
  }, []);

  const context = {
    foods,
    setFoods,
    foodCategories,
    setfoodCategories,
    foodRandom,
    setFoodRandom,
  };

  return (
    <FoodContext.Provider value={ context }>
      { children }
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodProvider;
