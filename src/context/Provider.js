import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { fetchApi, MEALS_LIST, DRINKS_LIST } from '../services';

function Provider({ children }) {
  const [mealsList, setMealsList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const listLimit = 12;
      try {
        const { meals } = await fetchApi(MEALS_LIST);
        setMealsList(meals.filter((_meal, index) => index < listLimit));

        const { drinks } = await fetchApi(DRINKS_LIST);
        setDrinksList(drinks.filter((_drink, index) => index < listLimit));
      } catch (error) {
        console.log(error);
      }
    };
    getRecipes();
  }, []);

  const contextValue = {
    mealsList,
    drinksList,
  };
  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
