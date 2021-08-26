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

  const [recipes, setRecipes] = useState([]);

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

  const requestCategory = async (categories, func, state) => {
    const response = await fetch(categories);
    const result = await response.json();
    func({
      ...state,
      list: result,
      loading: false,
    });
  };

  const RequestAPI = async () => {
    const response = await fetch(API);
    const result = await response.json();
    setRecipes(result);
  };

  const foodCategoryAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinkCategoryAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    switchAPI(filter);
    requestCategory('https://www.themealdb.com/api/json/v1/1/search.php?s=', setFoodRecipes, foodRecipes);
    requestCategory('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', setDrinkRecipes, drinkRecipes);
    requestCategory(foodCategoryAPI, setFoodCategories, foodCategories);
    requestCategory(drinkCategoryAPI, setDrinkCategories, drinkCategories);
  }, [filter, API, drinkCategories, drinkRecipes, foodCategories, foodRecipes]);

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
