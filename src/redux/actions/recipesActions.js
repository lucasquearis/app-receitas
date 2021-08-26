export const LOADING_RECIPES = 'LOADING_RECIPES';
export const GET_RECIPES = 'GET_RECIPES';
export const SEND_RECIPE_DATA = 'SEND_RECIPE_DATA';
const FOODS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const GET_CATEGORIES = 'GET_CATEGORIES';
const FOODS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINKS_CATEGORIES_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const RECIPES_QUANTITY = 12;
const CATEGORIES_QUANTITY = 5;

export const loadingRecipes = () => ({
  type: LOADING_RECIPES,
});

export const getRecipes = (recipes) => ({
  type: GET_RECIPES, recipes: recipes.slice(0, RECIPES_QUANTITY),
});

export const sendRecipeData = (recipes) => ({
  type: SEND_RECIPE_DATA, recipes,
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
