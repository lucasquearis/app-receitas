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

export const myFavoriteRecipe = (recipe) => {
  if (!recipe) {
    localStorage.removeItem('favoriteRecipes');
    return false;
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify([recipe]));
  return true;
};

export const startRecipe = (recipe) => {
  const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (recipes) {
    localStorage.setItem('doneRecipes', JSON.stringify(
      [...recipes, recipe],
    ));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify(
      [recipe],
    ));
  }
};

export const getDate = (date) => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  date = `${dd}/${mm}/${yyyy}`;

  return date;
};
