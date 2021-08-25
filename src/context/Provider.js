import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [drinkCategory, setDrinkCategory] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [filter, setFilter] = useState('');

  const contextValue = {
    email,
    setEmail,
    foodData,
    setFoodData,
    drinkData,
    setDrinkData,
    drinkCategory,
    setDrinkCategory,
    foodCategory,
    setFoodCategory,
    filter,
    setFilter,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
