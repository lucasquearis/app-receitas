import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './FoodContext';
import fetchMealApi from '../services/fetchMealApi';

const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [foodFilter, setFoodFilter] = useState({
    searchText: '',
    search: '',
  });

  useEffect(() => {
    fetchMealApi(foodFilter).then((data) => {
      setFoods(data.meals);
    });
  }, [foodFilter]);

  const contextValue = {
    foods,
    foodFilter,
    setFoodFilter,
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
