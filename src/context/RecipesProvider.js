// vitals
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// context
import myContext from './myContext';
// API
import getFoodByIngredient from '../services/foodAPI';

function RecipesProvider({ children }) {
  const [firstState, setFirstState] = useState(true);
  const [searchValues, setSearchValues] = useState({
    textValue: '', radioValue: 'ingredient', pathName: '/comidas' });
  const [filteredMealsOrDrinks, setFilteredMealsOrDrinks] = useState(false);
  
  console.log(filteredMealsOrDrinks)

  useEffect(() => {
    const resultFilter = async () => {
      const result = await getFoodByIngredient(searchValues);
      setFilteredMealsOrDrinks(result);
    };
    resultFilter();
  },
  [searchValues]);

  const globalState = {
    firstState,
    setFirstState,
    setSearchValues,
    filterdMealsOrDrinks,
  };

  return (
    <myContext.Provider value={ globalState }>
      {children}
    </myContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipesProvider;
