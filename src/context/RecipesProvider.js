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
    textValue: '', radioValue: 'ingredient', pathName: '/comidas' });
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
  const [url, setUrl] = useState();
  const [lists, setLists] = useState({
    ingredients: [],
    measure: [],
  });

  const globalState = {
    url,
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
      // if (resultDrinks.drinks === null) global.alert(ALERT_TWO);
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
    const favoriteClick = () => {
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: '',
        type: '',
        area: '',
        category: '',
        alcoholicOrNot: '',
        name: '',
        image: '',
        doneDate: '',
        tags: '',
      }]));
    };

    favoriteClick();
  }, []);

  useEffect(() => {
    const filterIngredients = () => {
      const keys = Object.keys(recipe).filter((key) => key.includes('Ingredient'));
      const list = keys.map((key) => recipe[key]);
      const measureQnt = Object.keys(recipe).filter((key) => key.includes('Measure'));
      const measureList = measureQnt.map((key) => recipe[key]);
      setLists({
        ...lists,
        ingredients: list.filter((item) => item),
        measure: measureList.filter((item) => item),
      });
    };
    const correctUrl = () => {
      const ytUrl = recipe.strYoutube;
      if (ytUrl) setUrl(ytUrl.replace('watch?v=', 'embed/'));
    };

    correctUrl();
    filterIngredients();
  }, [recipe]);

  useEffect(() => {
    const resultFilter = async () => {
      const result = await getMeals(searchValues);
      setFilteredMealsOrDrinks(result);
    };
    resultFilter();
  },
  [searchValues]);

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
