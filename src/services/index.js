const copy = require('clipboard-copy');

const FOODS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const FOOD_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINK_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const fetchFoods = async () => {
  try {
    const response = await fetch(FOODS_URL);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinks = async () => {
  try {
    const response = await fetch(DRINKS_URL);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const foodCategories = async () => {
  try {
    const response = await fetch(FOOD_CATEGORIES_URL);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const drinkCategories = async () => {
  try {
    const response = await fetch(DRINK_CATEGORIES_URL);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategoriesFoods = async (name) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCategoriesDrinks = async (name) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`,
    );
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const copyToClipboard = () => {
  copy(window.location.href);
  return true;
};

export const copyToClipboardDone = (id, foodOrDrink) => {
  const myUrl = copy(`http://${window.location.host}/${foodOrDrink}s/${id}`);
  return myUrl;
};

export const myFavoriteRecipe = (recipe) => {
  const arrayOfFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (arrayOfFavorites) {
    const checkName = arrayOfFavorites.filter(({ name }) => name === recipe.name);
    if (!checkName.length) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...arrayOfFavorites, recipe],
      ));
      return (true);
    }
    const filteredName = arrayOfFavorites.filter((food) => food.name !== recipe.name);
    if (!filteredName.length) {
      localStorage.removeItem('favoriteRecipes');
    } else {
      localStorage.removeItem('favoriteRecipes');
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        filteredName,
      ));
      return (false);
    }
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
    return (true);
  }
};

export const startDrinkRecipe = (recipe) => {
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (recipes) {
    const checkName = recipes
      .filter(({ cocktails }) => (
        String(Object.keys(cocktails)) === String(Object.keys(recipe.cocktails))));
    console.log('se tem igual', checkName);
    if (checkName.length) {
      return (true);
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      [...recipes, recipe],
    ));

    return (true);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(
    [recipe],
  ));
  return (true);
};

export const startFoodRecipe = (recipe) => {
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (recipes) {
    const checkName = recipes
      .filter(({ meals }) => (
        String(Object.keys(meals)) === String(Object.keys(recipe.meals))));
    console.log('se tem igual', checkName);
    if (!checkName.length) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(
        [...recipes, recipe],
      ));
      return (true);
    }
    return (true);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(
    [recipe],
  ));
  return (true);
};

export const getDate = (date) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  date = `${dd}/${mm}/${yyyy}`;

  return date;
};
