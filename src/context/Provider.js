import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);

  const contextValue = {
    email,
    setEmail,
    foodData,
    setFoodData,
    drinkData,
    setDrinkData,
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
