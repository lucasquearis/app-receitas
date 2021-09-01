import { useState } from 'react';

function useAPI(pathname) {
  const foodAPI = 'https://www.themealdb.com/api/json/v1/1';
  const drinkAPI = 'https://www.thecocktaildb.com/api/json/v1/1';

  const [action, setAction] = useState('');

  const [foods, setFoods] = useState({ meals: [] });
  const [drinks, setDrinks] = useState({ drinks: [] });

  const [foodsCategories, setFoodsCategories] = useState({ meals: [] });
  const [drinksCategories, setDrinksCategories] = useState({ drinks: [] });
  const [ingredients, setIngredients] = useState('');

  const getIngredients = () => {
    setIngredients()
  }

  const recipes = { drinks: drinks.drinks, meals: foods.meals };

  let api;
  let set;
  let cat;
  let categories;

  if (/comidas/.test(pathname)) {
    api = foodAPI;
    set = setFoods;
    cat = setFoodsCategories;
    categories = foodsCategories;
  } else if (/bebidas/.test(pathname)) {
    api = drinkAPI;
    set = setDrinks;
    cat = setDrinksCategories;
    categories = drinksCategories;
  }

  function setRecipes(data, setter) {
    const key = Object.keys(data)[0];
    const value = data[key];

    if (value === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return setter({ [key]: [] });
    }

    setter(data);
  }

  function request(url, setter) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setRecipes(data, setter))
      .catch(console.error);
  }

  function searchByFilters(filter = 's', query = '') {
    setAction('search-filters');
    if (filter === 'i') {
      return request(`${api}/filter.php?${filter}=${query}`, set);
    }
    request(`${api}/search.php?${filter}=${query}`, set);
  }

  function searchByCategory(query = '') {
    setAction('search-categories');
    if (!query) {
      return request(`${api}/search.php?s=`, set);
    }
    request(`${api}/filter.php?c=${query}`, set);
  }

  function searchByArea(query) {
    setAction('search-area');
    if (query !== 'All') {
      request(`${api}/filter.php?a=${query}`, set);
    } else {
      request(`${api}/search.php?f=s`, set);
    }
  }

  function listCategories() {
    setAction('list-categories');
    request(`${api}/list.php?c=list`, cat);
  }

  return {
    action,
    recipes,
    pathname,
    categories,
    listCategories,
    searchByFilters,
    searchByCategory,
    searchByArea,
  };
}

export default useAPI;
