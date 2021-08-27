export const GET_RECIPES = 'GET_RECIPES';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_AREA = 'GET_AREA';

const C_DEFAULT_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const C_INGREDIENT_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const C_NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const C_FIRST_LETTER_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const C_CATEGORY_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const C_AREA_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const C_INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const B_DEFAULT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const B_FIRST_LETTER_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const B_NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const B_INGREDIENT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const B_CATEGORY_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const B_INGREDIENTS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const MEAL_AREA_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const CATEGORY_MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const CATEGORY_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const C_RANDOM_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const B_RANDOM_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

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

export const getArea = (payload) => ({
  type: GET_AREA,
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

export function requestRandom(path) {
  if (path === '/bebidas') {
    return (dispatch) => fetch(`${B_RANDOM_URL}`)
      .then((r) => r.json())
      .then((json) => dispatch(getRecipes(json)));
  }
  return (dispatch) => fetch(`${C_RANDOM_URL}`)
    .then((r) => r.json())
    .then((json) => dispatch(getRecipes(json)));
}

export function requestByArea(area) {
  return (dispatch) => fetch(`${C_AREA_URL}${area}`)
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

export function requestAreaList() {
  return (dispatch) => fetch(MEAL_AREA_URL)
    .then((r) => r.json())
    .then((json) => dispatch(getArea(json)));
}

export function requestCategoryList(path) {
  if (path === '/bebidas') {
    return (dispatch) => fetch(CATEGORY_DRINK_URL)
      .then((r) => r.json())
      .then((json) => dispatch(getCategories(json)));
  }
  return (dispatch) => fetch(CATEGORY_MEAL_URL)
    .then((r) => r.json())
    .then((json) => dispatch(getCategories(json)));
}
