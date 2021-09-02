import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [user, setUser] = useState({
    user: {
      email: '',
    },
  });

  const [filter, setFilter] = useState({
    type: '',
    search: '',
    src: '',
  });

  const [redirect, setRedirect] = useState(false);

  const [recipes, setRecipes] = useState({
    list: [],
    loading: true,
  });

  const [foodRecipes, setFoodRecipes] = useState({
    list: [],
    loading: true,
  });

  const [drinkRecipes, setDrinkRecipes] = useState({
    list: [],
    loading: true,
  });

  const [foodCategories, setFoodCategories] = useState({
    list: [],
    loading: true,
  });

  const [foodIngredients, setFoodIngredients] = useState({
    list: [],
    loading: true,
  });

  const [drinkIngredients, setDrinkIngredients] = useState({
    list: [],
    loading: true,
  });

  const [drinkCategories, setDrinkCategories] = useState({
    list: [],
    loading: true,
  });

  const [API, setAPI] = useState('');

  const switchAPI = (searchFilter) => {
    switch (searchFilter.type) {
    case 'ingredient':
      setAPI(`https://www.the${searchFilter.src}db.com/api/json/v1/1/filter.php?i=${searchFilter.search}`);
      break;
    case 'name':
      setAPI(`https://www.the${searchFilter.src}db.com/api/json/v1/1/search.php?s=${searchFilter.search}`);
      break;
    case 'first-letter':
      setAPI(`https://www.the${searchFilter.src}db.com/api/json/v1/1/search.php?f=${searchFilter.search}`);
      break;
    default:
      break;
    }
  };

  const requestRandomAPI = async (type) => {
    const response = await fetch(`https://www.the${type}db.com/api/json/v1/1/random.php`);
    const result = await response.json();
    if (type === 'meal') {
      setFoodRecipes({ ...foodRecipes, list: result, loading: false });
    } else {
      setDrinkRecipes({ ...drinkRecipes, list: result, loading: false });
    }
  };

  const requestCategory = async (categories, func) => {
    const response = await fetch(categories);
    const result = await response.json();
    func({
      list: result,
      loading: false,
    });
  };

  const foodCategoryAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinkCategoryAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const RequestAPI = async () => {
    const response = await fetch(API);
    const result = await response.json();
    const resultNull = result.drinks === null || result.meals === null;
    if (resultNull) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      if (filter.src === 'meal') {
        setFoodRecipes({ ...foodRecipes, list: result, loading: false });
      }
      setDrinkRecipes({ ...drinkRecipes, list: result, loading: false });
    }
  };

  const requestFoodIngredients = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const result = await response.json();
    setFoodIngredients({ ...foodIngredients, list: result, loading: false });
  };

  const requestDrinkIngredients = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const result = await response.json();
    setDrinkIngredients({ ...drinkIngredients, list: result, loading: false });
  };

  const requestAreas = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const { meals } = await response.json();
    return meals;
  };

  const requestFoodByAreas = async (area) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const { meals } = await response.json();
    return meals;
  };

  const requestFoodByName = async (name) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const { meals } = await response.json();
    return meals;
  };

  useEffect(() => {
    switchAPI(filter);
  }, [filter, API]);

  const contextValue = {
    user,
    setUser,
    filter,
    setFilter,
    API,
    RequestAPI,
    recipes,
    foodCategories,
    requestCategory,
    drinkCategories,
    foodRecipes,
    drinkRecipes,
    setFoodRecipes,
    foodCategoryAPI,
    setFoodCategories,
    drinkCategoryAPI,
    setDrinkRecipes,
    setDrinkCategories,
    setRecipes,
    requestRandomAPI,
    requestAreas,
    requestFoodByAreas,
    requestFoodByName,
    drinkIngredients,
    foodIngredients,
    requestFoodIngredients,
    requestDrinkIngredients,
    setRedirect,
    redirect,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
