import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';
import { getMeals } from '../services/mealAPI';
import { getDrinks } from '../services/drinkAPI';
import { ALERT_TWO, MEAL_OBJ, DRINK_OBJ } from '../services/data';

function RecipesProvider({ children }) {
  const [searchValues, setSearchValues] = useState({
    textValue: '', radioValue: 'name', pathname: '/comidas' });
  const [filteredMealsOrDrinks, setFilteredMealsOrDrinks] = useState(false);
  const [infoUser, setInfoUser] = useState({ email: '', password: '' });
  const [updateData, setUpdateData] = useState(false);
  const [baseDataMeals, setBaseDataMeals] = useState();
  const [baseDataDrinks, setBaseDataDrinks] = useState();
  const [filteredMeals, setFilteredMeals] = useState(false);
  const [filteredDrinks, setFilteredDrinks] = useState(false);
  const [favorite, setFavorite] = useState({});
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const [keyType, setKeysType] = useState('');
  const [lists, setLists] = useState({ ingredients: [], measure: [] });
  const [id, setId] = useState('');
  const [keyProgress, setKeyProgress] = useState('');
  const value = JSON.parse(localStorage.getItem('inProgressRecipes')) || { cocktails: { chave: [] }, meals: { chave: [] } };
  const [objRecipeProgress, setObjRecipeProgress] = useState(value);

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

  useEffect(() => {
    const resultFilter = async () => {
      const result = await getMeals(searchValues);
      setFilteredMealsOrDrinks(result);
    };
    resultFilter();
  },
  [searchValues]);

  useEffect(() => {
    const filterIngredients = () => {
      const ingredients = Object.keys(recipe)
        .filter((key) => key.includes('Ingredient'))
        .map((key) => recipe[key])
        .filter((item) => item);
      const measure = Object.keys(recipe)
        .filter((key) => key.includes('Measure'))
        .map((key) => recipe[key])
        .filter((item) => item !== ' ' && item !== null);
      setLists({ ...lists, ingredients, measure });
    };
    filterIngredients();
  }, [recipe]);

  useEffect(() => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: infoUser.email }));
  }, [infoUser]);

  const globalState = {
    objRecipeProgress,
    setObjRecipeProgress,
    keyProgress,
    setKeyProgress,
    id,
    setId,
    setLists,
    lists,
    keyType,
    setKeysType,
    recipe,
    setRecipe,
    loading,
    setLoading,
    favorite,
    setFavorite,
    infoUser,
    setInfoUser,
    setSearchValues,
    filteredMeals,
    filteredDrinks,
    filteredMealsOrDrinks,
    updateData,
    setUpdateData,
    baseDataMeals,
    baseDataDrinks,
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
