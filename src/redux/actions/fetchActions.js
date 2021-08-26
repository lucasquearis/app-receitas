export const GET_RECIPES = 'GET_RECIPES';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';

const C_DEFAULT_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const C_INGREDIENT_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const C_NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const C_FIRST_LETTER_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const C_CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const C_INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const B_DEFAULT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const B_FIRST_LETTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const B_NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const B_INGREDIENT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const B_CATEGORY_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const B_INGREDIENTS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

export const getRecipes = (payload) => ({
  type: GET_RECIPES,
  payload,
});

export const getCategories = (payload) => ({
  type: GET_CATEGORIES,
  payload,
});

export const getIngredients = (payload) => ({
  type: GET_INGREDIENTS,
  payload,
});

export function requestDefault(path) {
  if (path === '/bebidas') {
    return (dispatch) => fetch(`${B_DEFAULT_URL}`)
      .then((r) => r.json())
      .then((json) => dispatch(getRecipes(json)));
  }
  return (dispatch) => fetch(`${C_DEFAULT_URL}`)
    .then((r) => r.json())
    .then((json) => dispatch(getRecipes(json)));
}

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

export function requestIngredientsList(path) {
  if (path === '/explorar/bebidas/ingredientes') {
    return (dispatch) => fetch(`${B_INGREDIENTS_URL}`)
      .then((r) => r.json())
      .then((json) => dispatch(getIngredients(json)));
  }
  return (dispatch) => fetch(`${C_INGREDIENTS_URL}`)
    .then((r) => r.json())
    .then((json) => dispatch(getIngredients(json)));
}
