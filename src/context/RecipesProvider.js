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
  const [onOff, setOnOff] = useState('');
  const [keyProgress, setKeyProgress] = useState('');
  const [objRecipeProgress, setObjRecipeProgress] = useState({});

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
      const ingredientKeys = Object.keys(recipe).filter((key) => key.includes('Ingredient'));
      const measureKeys = Object.keys(recipe).filter((key) => key.includes('Measure'));

      const ingredientList = ingredientKeys.map((key) => recipe[key]);
      const measureList = measureKeys.map((key) => recipe[key]);

      const ingredients = ingredientList.filter((item) => item);
      const measure = measureList.filter((item) => item);

      const size = Object.keys(ingredients).length;
      const classNameItem = new Array(size).fill('off');
      const data = { ingredients, measure, classNameItem };
      setLists({ ...lists, ...data });
      setOnOff(classNameItem);
    };
    filterIngredients();
  }, [recipe]);

  // useEffect(() => {
  //   const loadingLocalStore = () => {
  //     const obj = { cocktails: {}, meals: {} };
  //     localStorage.setItem('inProgressRecipe', JSON.stringify(obj));
  //   };
  //   loadingLocalStore();
  // }, []);

  // useEffect(() => {
  //   const getValuesLocalStore = async () => {
  //     const local = await JSON.parse(localStorage.getItem('inProgressRecipe'));
  //     const text = keyType === 'meals' ? 'meals' : 'cocktails';
  //     console.log('now', text);
  //     if (Object.keys(local[text]).includes(id)) return setOnOff(local[text][id]);
  //   };
  //   getValuesLocalStore();
  // }, [keyType, id]);

  useEffect(() => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: infoUser.email }));
    // localStorage.setItem('inProgressRecipes', JSON.stringify({ cocktails: { '': [] }, meals: { '': [] } }));
  }, [infoUser]);

  const globalState = {
    objRecipeProgress,
    setObjRecipeProgress,
    keyProgress,
    setKeyProgress,
    onOff,
    setOnOff,
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
