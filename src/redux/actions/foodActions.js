import {
  fetchFoods,
  fetchDrinks,
  drinkCategories,
  foodCategories,
  fetchCategoriesFoods,
  fetchCategoriesDrinks,
  fetchIngredientsFoods,
  fetchNameFoods,
  fetchFirstLetterFoods,
  fetchIngredientsDrinks,
  fetchNameDrinks,
  fetchFirstLetterDrinks,
} from '../../services';

import {
  ADD_FOODS,
  ADD_DRINKS,
  ADD_DRINKS_CATEGORIES,
  ADD_FOODS_CATEGORIES,
  ADD_MEAL_DETAIL,
  ADD_DRINK_DETAIL,
  REDIRECT,
} from './actionTypes';

export const addFoods = (payload) => ({
  type: ADD_FOODS,
  payload,
});

const addDrinks = (payload) => ({
  type: ADD_DRINKS,
  payload,
});

const addDrinksCategories = (payload) => ({
  type: ADD_DRINKS_CATEGORIES,
  payload,
});

const addFoodsCategories = (payload) => ({
  type: ADD_FOODS_CATEGORIES,
  payload,
});

const addMealDetail = (payload) => ({
  type: ADD_MEAL_DETAIL,
  payload,
});

const addDrinkDetail = (payload) => ({
  type: ADD_DRINK_DETAIL,
  payload,
});

const redirect = (payload) => ({
  type: REDIRECT,
  payload,
});

export const fetchFoodRedux = async (dispatch) => {
  const results = await fetchFoods();
  dispatch(addFoods(results));
};

export const fetchDrinksRedux = async (dispatch) => {
  const results = await fetchDrinks();
  dispatch(addDrinks(results));
};

export const fetchFoodsCategoriesRedux = async (dispatch) => {
  const results = await foodCategories();
  dispatch(addFoodsCategories(results));
};

export const fetchDrinksCategoriesRedux = async (dispatch) => {
  const results = await drinkCategories();
  dispatch(addDrinksCategories(results));
};

export const fetchMealDetails = (id) => async (dispatch) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const results = await response.json();
  dispatch(addMealDetail(results));
};

export const fetchDrinkDetails = (id) => async (dispatch) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const results = await response.json();
  dispatch(addDrinkDetail(results));
};

export const fetchFoodByCategory = (name) => async (dispatch) => {
  const results = await fetchCategoriesFoods(name);
  dispatch(addFoods(results));
};

export const fetchDrinksByCategory = (name) => async (dispatch) => {
  const results = await fetchCategoriesDrinks(name);
  dispatch(addDrinks(results));
};

const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

export const fetchFoodByIngredient = (ingredient) => async (dispatch) => {
  const results = await fetchIngredientsFoods(ingredient);
  if (results.meals === null) {
    global.alert(msg);
  } else if (results.meals.length === 1) {
    dispatch(addFoods(results));
    dispatch(redirect(results.meals[0].idMeal));
  } else {
    dispatch(addFoods(results));
  }
};

export const fetchFoodByName = (name) => async (dispatch) => {
  const results = await fetchNameFoods(name);
  if (results.meals === null) {
    global.alert(msg);
  } else if (results.meals.length === 1) {
    dispatch(addFoods(results));
    dispatch(redirect(results.meals[0].idMeal));
  } else {
    dispatch(addFoods(results));
  }
};

export const fetchFoodByFirstLetter = (firstLetter) => async (dispatch) => {
  const results = await fetchFirstLetterFoods(firstLetter);
  if (results.meals === null) {
    global.alert(msg);
  } else if (results.meals.length === 1) {
    dispatch(addFoods(results));
    dispatch(redirect(results.meals[0].idMeal));
  } else {
    dispatch(addFoods(results));
  }
};

export const fetchDrinkByIngredient = (ingredient) => async (dispatch) => {
  const results = await fetchIngredientsDrinks(ingredient);
  if (results.drinks === null) {
    global.alert(msg);
  } else if (results.drinks.length === 1) {
    dispatch(addDrinks(results));
    dispatch(redirect(results.drinks[0].idDrink));
  } else {
    dispatch(addDrinks(results));
  }
};

export const fetchDrinkByName = (name) => async (dispatch) => {
  const results = await fetchNameDrinks(name);
  if (results.drinks === null) {
    global.alert(msg);
  } else if (results.drinks.length === 1) {
    dispatch(addDrinks(results));
    dispatch(redirect(results.drinks[0].idDrink));
  } else {
    dispatch(addDrinks(results));
  }
};

export const fetchDrinkByFirstLetter = (firstLetter) => async (dispatch) => {
  const results = await fetchFirstLetterDrinks(firstLetter);
  if (results.drinks === null) {
    global.alert(msg);
  } else if (results.drinks.length === 1) {
    dispatch(addDrinks(results));
    dispatch(redirect(results.drinks[0].idDrink));
  } else {
    dispatch(addDrinks(results));
  }
};
