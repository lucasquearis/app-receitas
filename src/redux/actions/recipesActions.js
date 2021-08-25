export const LOADING_RECIPES = 'LOADING_RECIPES';
export const GET_RECIPES = 'GET_RECIPES';
const FOODS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const RECIPES_QUANTITY = 12;

export const loadingRecipes = () => ({
  type: LOADING_RECIPES,
});

export const getRecipes = (recipes) => ({
  type: GET_RECIPES, recipes,
});

export const requestFoods = () => async (dispatch) => {
  dispatch(loadingRecipes());
  const response = await fetch(FOODS_URL);
  const { meals } = await response.json();
  dispatch(getRecipes(meals.slice(0, RECIPES_QUANTITY)));
};

export const requestDrinks = () => async (dispatch) => {
  dispatch(loadingRecipes());
  const response = await fetch(DRINKS_URL);
  const { drinks } = await response.json();
  dispatch(getRecipes(drinks.slice(0, RECIPES_QUANTITY)));
};
