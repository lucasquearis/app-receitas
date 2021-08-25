export const GET_RECIPES = 'GET_RECIPES';
export const GET_CATEGORIES = 'GET_CATEGORIES';

const C_INGREDIENT_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const C_NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const C_FIRST_LETTER_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const C_CATEGORY_URL = 'www.themealdb.com/api/json/v1/1/filter.php?c=';
const B_FIRST_LETTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const B_NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const B_INGREDIENT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const B_CATEGORY_URL = 'www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export const getRecipes = (payload) => ({
  type: GET_RECIPES,
  payload,
});

export const getCategories = (payload) => ({
  type: GET_CATEGORIES,
  payload,
});

export function requestByIngredient(searchValue, path) {
  if (path === '/bebidas') {
    return (dispatch) => fetch(`${B_INGREDIENT_URL}${searchValue}`)
      .then((r) => r.json())
      .then((json) => dispatch(getRecipes(json)));
  }
  return (dispatch) => fetch(`${C_INGREDIENT_URL}${searchValue}`)
    .then((r) => r.json())
    .then((json) => dispatch(getRecipes(json)));
}

export function requestByName(searchValue, path) {
  if (path === '/bebidas') {
    return (dispatch) => fetch(`${B_NAME_URL}${searchValue}`)
      .then((r) => r.json())
      .then((json) => dispatch(getRecipes(json)));
  }
  return (dispatch) => fetch(`${C_NAME_URL}${searchValue}`)
    .then((r) => r.json())
    .then((json) => dispatch(getRecipes(json)));
}

export function requestByFirstLetter(searchValue, path) {
  if (path === '/bebidas') {
    return (dispatch) => fetch(`${B_FIRST_LETTER_URL}${searchValue}`)
      .then((r) => r.json())
      .then((json) => dispatch(getRecipes(json)));
  }
  return (dispatch) => fetch(`${C_FIRST_LETTER_URL}${searchValue}`)
    .then((r) => r.json())
    .then((json) => dispatch(getRecipes(json)));
}

export function requestByCategory(category, path) {
  if (path === '/bebidas') {
    return (dispatch) => fetch(`${B_CATEGORY_URL}${category}`)
      .then((r) => r.json())
      .then((json) => dispatch(getRecipes(json)));
  }
  return (dispatch) => fetch(`${C_CATEGORY_URL}${category}`)
    .then((r) => r.json())
    .then((json) => dispatch(getRecipes(json)));
}
