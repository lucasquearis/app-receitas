export const LOADING_RECIPES = 'LOADING_RECIPES';
export const GET_RECIPES = 'GET_RECIPES';
const FOODS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const GET_CATEGORIES = 'GET_CATEGORIES';
const FOODS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINKS_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
const FOODS_INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const DRINKS_INGREDIENTS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
export const GET_AREAS = 'GET_AREAS';
const AREAS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const RECIPES_QUANTITY = 12;
const INGREDIENTS_QUANTITY = 12;
const CATEGORIES_QUANTITY = 5;

export const loadingRecipes = () => ({
  type: LOADING_RECIPES,
});

export const getRecipes = (recipes) => ({
  type: GET_RECIPES, recipes: recipes.slice(0, RECIPES_QUANTITY),
});

export const requestFoods = () => async (dispatch) => {
  dispatch(loadingRecipes());
  const response = await fetch(FOODS_URL);
  const { meals } = await response.json();
  dispatch(getRecipes(meals));
};

export const requestDrinks = () => async (dispatch) => {
  dispatch(loadingRecipes());
  const response = await fetch(DRINKS_URL);
  const { drinks } = await response.json();
  dispatch(getRecipes(drinks));
};

export const getCategories = (categories) => ({
  type: GET_CATEGORIES, categories: categories.slice(0, CATEGORIES_QUANTITY),
});

export const requestFoodsCategories = () => async (dispatch) => {
  dispatch(loadingRecipes());
  const response = await fetch(FOODS_CATEGORIES_URL);
  const { meals } = await response.json();
  dispatch(getCategories(meals));
};

export const requestDrinksCategories = () => async (dispatch) => {
  dispatch(loadingRecipes());
  const response = await fetch(DRINKS_CATEGORIES_URL);
  const { drinks } = await response.json();
  dispatch(getCategories(drinks));
};

export const getIngredients = (ingredients) => ({
  type: GET_INGREDIENTS, ingredients: ingredients.slice(0, INGREDIENTS_QUANTITY),
});

export const requestFoodsIngredients = () => async (dispatch) => {
  dispatch(loadingRecipes());
  const response = await fetch(FOODS_INGREDIENTS_URL);
  const { meals } = await response.json();
  dispatch(getIngredients(meals));
};

export const requestDrinksIngredients = () => async (dispatch) => {
  dispatch(loadingRecipes());
  const response = await fetch(DRINKS_INGREDIENTS_URL);
  const { drinks } = await response.json();
  dispatch(getIngredients(drinks));
};

export const getAreas = (areas) => ({
  type: GET_AREAS, areas,
});

export const requestAreas = () => async (dispatch) => {
  dispatch(loadingRecipes());
  const response = await fetch(AREAS_URL);
  const { meals } = await response.json();
  dispatch(getAreas(meals));
};
