import {
  fetchAPICategories,
  fetchAPIList,
  fetchAPIListByCategory,
  fetchDrinkRandom,
  fetchDrinkIngredientsList,
  fetchFilterByIngredientList,
} from '../../services/DrinkAPIFetch';

export const DRINK_LIST_SUCCESS = 'DRINK_LIST_SUCCESS';
export const DRINK_CATEGORIES_SUCCESS = 'DRINK_CATEGORIES_SUCCESS';
export const DRINK_RANDOM_SUCCESS = 'DRINK_RANDOM_SUCCESS';
export const DRINK_INGREDIENTS_LIST_SUCCESS = 'DRINK_INGREDIENTS_LIST_SUCCESS';
export const DRINK_HANDLECLICK_INGREDIENT = 'DRINK_HANDLECLICK_INGREDIENT';

export const drinkListSuccess = (payload) => ({
  type: DRINK_LIST_SUCCESS,
  payload,
});

export const drinkListFetch = () => async (dispatch) => {
  const returnFetch = await fetchAPIList();
  dispatch(drinkListSuccess(returnFetch));
};

export const drinkCategoriesSucccess = (payload) => ({
  type: DRINK_CATEGORIES_SUCCESS,
  payload,
});

export const drinkCategoriesFetch = () => async (dispatch) => {
  const returnFetch = await fetchAPICategories();
  dispatch(drinkCategoriesSucccess(returnFetch));
};

export const drinkListByCategoryFetch = (category) => async (dispatch) => {
  const returnAPI = await fetchAPIListByCategory(category);
  dispatch(drinkListSuccess(returnAPI));
};

// Isso é uma action
export const drinkRandomSuccess = (payload) => ({
  type: DRINK_RANDOM_SUCCESS,
  payload,
});

// Isso é um Thunk
export const drinkRandomFetch = () => async (dispatch) => {
  const returnFetch = await fetchDrinkRandom();
  dispatch(drinkRandomSuccess(returnFetch));
};

export const drinkIngredientsListSuccess = (payload) => ({
  type: DRINK_INGREDIENTS_LIST_SUCCESS,
  payload,
});

export const drinkIngredientsListFetch = () => async (dispatch) => {
  const returnFetch = await fetchDrinkIngredientsList();
  dispatch(drinkIngredientsListSuccess(returnFetch));
};

export const drinkFilterByIngredientListFetch = (title) => async (dispatch) => {
  const returnFetch = await fetchFilterByIngredientList(title);
  dispatch(drinkListSuccess(returnFetch));
};

export const drinkHandleClickIngredient = (payload) => ({
  type: DRINK_HANDLECLICK_INGREDIENT,
  payload,
});
