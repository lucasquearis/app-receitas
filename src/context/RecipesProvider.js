// vitals
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// context
import myContext from './myContext';
// API
import getMeals from '../services/mealAPI';
import getDrinks from '../services/drinkAPI';
import { ALERT_TWO, MEAL_OBJ, DRINK_OBJ } from '../services/data';

function RecipesProvider({ children }) {
  const [searchValues, setSearchValues] = useState({
    textValue: '', radioValue: 'ingredient', pathname: '/comidas' });
  const [filteredMeals, setFilteredMeals] = useState(false);
  const [filteredDrinks, setFilteredDrinks] = useState(false);
  const [infoUser, setInfoUser] = useState({ email: '', password: '' });
  const [updateData, setUpdateData] = useState(false);
  const [baseDataMeals, setBaseDataMeals] = useState();
  const [baseDataDrinks, setBaseDataDrinks] = useState();

  const globalState = {
    infoUser,
    setInfoUser,
    setSearchValues,
    filteredMeals,
    filteredDrinks,
    updateData,
    setUpdateData,
    baseDataMeals,
    baseDataDrinks,
  };
  useEffect(() => {
    const resultBaseMeals = async () => {
      const baseMeals = await getMeals(MEAL_OBJ);
      setBaseDataMeals(baseMeals);
    };
    resultBaseMeals();
  },
  [searchValues]);

  useEffect(() => {
    const resultFilterMeals = async () => {
      const resultMeals = await getMeals(searchValues);
      setFilteredMeals(resultMeals);
      if (resultMeals.meals === null) global.alert(ALERT_TWO);
    };
    resultFilterMeals();
  },
  [searchValues]);

  useEffect(() => {
    const resultFilterDrinks = async () => {
      const resultDrinks = await getDrinks(searchValues);
      setFilteredDrinks(resultDrinks);
      if (resultDrinks.drinks === null) global.alert(ALERT_TWO);
    };
    resultFilterDrinks();
  },
  [searchValues]);

  useEffect(() => {
    const resultBaseDrinks = async () => {
      const baseDrinks = await getDrinks(DRINK_OBJ);
      setBaseDataDrinks(baseDrinks);
    };
    resultBaseDrinks();
  },
  [searchValues]);

  // https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=cachaça
  // https://www.themealdb.com/api/json/v1/1/filter.php?i=""
  // https://www.themealdb.com/api/json/v1/1/filter.php?i=''

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
