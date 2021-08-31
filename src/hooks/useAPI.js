import { useState } from 'react';

function useAPI(pathname) {
  const foodAPI = 'https://www.themealdb.com/api/json/v1/1';
  const drinkAPI = 'https://www.thecocktaildb.com/api/json/v1/1';

  const [foods, setFoods] = useState({ meals: [] });
  const [drinks, setDrinks] = useState({ drinks: [] });

  const [foodsCategories, setFoodsCategories] = useState({ meals: [] });
  const [drinksCategories, setDrinksCategories] = useState({ drinks: [] });
  const [ingredients, setIngredients] = useState('');

  const getIngredients = () => {
    setIngredients()
  }

  let api;
  let set;
  let cat;
  let recipes;
  let categories;

  switch (pathname) {
  case '/comidas':
    recipes = foods;
    categories = foodsCategories;

    api = foodAPI;
    set = setFoods;
    cat = setFoodsCategories;
    break;

  case '/bebidas':
    recipes = drinks;
    categories = drinksCategories;

    api = drinkAPI;
    set = setDrinks;
    cat = setDrinksCategories;
    break;

  default:
    break;
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
    if (filter === 'i') {
      return request(`${api}/filter.php?${filter}=${query}`, set);
    }
    request(`${api}/search.php?${filter}=${query}`, set);
  }

  function searchByCategory(query = '') {
    if (!query) {
      return request(`${api}/search.php?s=`, set);
    }
    request(`${api}/filter.php?c=${query}`, set);
  }

  function listCategories() {
    request(`${api}/list.php?c=list`, cat);
  }

  return {
    recipes,
    pathname,
    categories,
    listCategories,
    searchByFilters,
    searchByCategory,
  };
}

export default useAPI;
