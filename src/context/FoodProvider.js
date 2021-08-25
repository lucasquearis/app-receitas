import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';
import fetchMealApi from '../services/fetchMealApi';
import fetchMealDetailsApi from '../services/fetchMealDetailsApi';

const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [foodDetailsId, setFoodDetailsId] = useState('');
  const [foodDetails, setFoodDetails] = useState([]);

  useEffect(() => {
    fetchMealApi().then((data) => {
      setFoods(data.meals);
    });
  }, []);

  useEffect(() => {
    fetchMealDetailsApi(foodDetailsId).then((data) => setFoodDetails(data.meals));
  }, [foodDetailsId]);

  const contextValue = {
    foods,
    setFoods,
    foodDetailsId,
    setFoodDetailsId,
    foodDetails,
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
