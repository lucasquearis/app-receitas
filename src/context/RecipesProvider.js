import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';
import { getMeals } from '../services/mealAPI';
import { getDrinks } from '../services/drinkAPI';
import {
  ALERT_TWO,
  MEAL_OBJ,
  DRINK_OBJ,
  OBJ_LOCAL_STORAGE,
  LOCAL_STORAGE_REC_PROGRESS,
} from '../services/data';

export default function RecipesProvider({ children }) {
  const RECIPE_PROGRESS = LOCAL_STORAGE_REC_PROGRESS || OBJ_LOCAL_STORAGE;
  const [objRecipeProgress, setObjRecipeProgress] = useState(RECIPE_PROGRESS);
  const [searchMeals, setSearchMeals] = useState(MEAL_OBJ);
  const [searchDrinks, setSearchDrinks] = useState(DRINK_OBJ);
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

  useEffect(() => {
    const resultBaseMeals = async () => {
      const baseMeals = await getMeals(MEAL_OBJ);
      setBaseDataMeals(baseMeals);
    };
    resultBaseMeals();
  },
  [searchMeals]);

  useEffect(() => {
    const resultBaseDrinks = async () => {
      const baseDrinks = await getDrinks(DRINK_OBJ);
      setBaseDataDrinks(baseDrinks);
    };
    resultBaseDrinks();
  },
  [searchDrinks]);

  useEffect(() => {
    const resultFilterMeals = async () => {
      const resultMeals = await getMeals(searchMeals);
      setFilteredMeals(resultMeals);
      if (resultMeals.meals === null) global.alert(ALERT_TWO);
    };
    resultFilterMeals();
  },
  [searchMeals]);

  useEffect(() => {
    const resultFilterDrinks = async () => {
      const resultDrinks = await getDrinks(searchDrinks);
      setFilteredDrinks(resultDrinks);
      if (resultDrinks.drinks === null) global.alert(ALERT_TWO);
    };
    resultFilterDrinks();
  },
  [searchDrinks]);

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
    searchMeals,
    setSearchMeals,
    searchDrinks,
    setSearchDrinks,
    objRecipeProgress,
    setObjRecipeProgress,
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
    filteredMeals,
    filteredDrinks,
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
