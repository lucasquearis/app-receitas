import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';
import fetchMealApi from '../services/fetchMealApi';

const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchMealApi().then((data) => {
      setFoods(data.meals);
    });
  }, []);

  const contextValue = {
    foods,
    setFoods,
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
