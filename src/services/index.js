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
  const myUrl = window.location.href;
  localStorage.setItem('clipboard', JSON.stringify(myUrl));
};

export const favoriteRecipe = (bool) => {
  if (!bool) {
    return true;
  }
  return false;
};
