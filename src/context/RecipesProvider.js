// vitals
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// context
import myContext from './myContext';
// API
import getFoodByIngredient from '../services/foodAPI';
import { ALERT_TWO } from '../services/data';

function RecipesProvider({ children }) {
  const [searchValues, setSearchValues] = useState({
    textValue: '', radioValue: 'ingredient', pathname: '/comidas' });
  const [filteredMealsOrDrinks, setFilteredMealsOrDrinks] = useState(false);
  const [infoUser, setInfoUser] = useState({ email: '', password: '' });

  const globalState = {
    infoUser,
    setInfoUser,
    setSearchValues,
    filteredMealsOrDrinks,
  };

  useEffect(() => {
    const resultFilter = async () => {
      const result = await getFoodByIngredient(searchValues);
      setFilteredMealsOrDrinks(result);
      if (result.meals === null) global.alert(ALERT_TWO);
    };
    resultFilter();
  },
  [searchValues]);

  // console.log(filteredMealsOrDrinks.meals);

  useEffect(() => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: infoUser.email }));
  }, [infoUser]);

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
