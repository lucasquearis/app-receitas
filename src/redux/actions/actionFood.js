import {
  fetchAPICategories,
  fetchAPIList,
  fetchAPIListByCategory,
  fetchFoodIngredientsList,
  fetchFoodRandom,
  fetchFoodFilterByIngredientList,
  fetchFoodPerAreaList,
  fetchFoodPerAreaFilter,
} from '../../services/FoodAPIFetch';

export const FOOD_LIST_SUCCESS = 'FOOD_LIST_SUCCESS';
export const FOOD_CATEGORIES_SUCCESS = 'FOOD_CATEGORIES_SUCCESS';
export const FOOD_RANDOM_SUCCESS = 'FOOD_RANDOM_SUCCESS';
export const FOOD_INGREDIENTS_LIST_SUCCESS = 'FOOD_INGREDIENTS_LIST_SUCCESS';
export const FOOD_HANDLECLICK_INGREDIENT = 'FOOD_HANDLECLICK_INGREDIENT';
export const FOOD_PER_AREA_LIST_SUCCESS = 'FOOD_PER_AREA_LIST_SUCCESS';
export const FOOD_PER_AREA_FILTER_SUCCESS = 'FOOD_PER_AREA_FILTER_SUCCESS';

export const foodListSuccess = (payload) => ({
  type: FOOD_LIST_SUCCESS,
  payload,
});

export const foodListFetch = () => async (dispatch) => {
  const returnFetch = await fetchAPIList();
  dispatch(foodListSuccess(returnFetch));
};

export const foodCategoriesSuccess = (payload) => ({
  type: FOOD_CATEGORIES_SUCCESS,
  payload,
});

export const foodCategoriesFetch = () => async (dispatch) => {
  const returnFetch = await fetchAPICategories();
  dispatch(foodCategoriesSuccess(returnFetch));
};

export const foodListByCategoryFetch = (category) => async (dispatch) => {
  const returnFetch = await fetchAPIListByCategory(category);
  dispatch(foodListSuccess(returnFetch));
};

export const foodRandomSuccess = (payload) => ({
  type: FOOD_RANDOM_SUCCESS,
  payload,
});

export const foodRandomFetch = () => async (dispatch) => {
  const returnFetch = await fetchFoodRandom();
  dispatch(foodRandomSuccess(returnFetch));
};

export const foodIngredientsListSuccess = (payload) => ({
  type: FOOD_INGREDIENTS_LIST_SUCCESS,
  payload,
});

export const foodIngredientsListFetch = () => async (dispatch) => {
  const returnFetch = await fetchFoodIngredientsList();
  dispatch(foodIngredientsListSuccess(returnFetch));
};

export const foodFilterByIngredientListFetch = (title) => async (dispatch) => {
  const returnFetch = await fetchFoodFilterByIngredientList(title);
  dispatch(foodListSuccess(returnFetch));
};

export const foodHandleClickIngredient = (payload) => ({
  type: FOOD_HANDLECLICK_INGREDIENT,
  payload,
});

export const foodPerAreaListSuccess = (payload) => ({
  type: FOOD_PER_AREA_LIST_SUCCESS,
  payload,
});

export const foodPerAreaListFetch = () => async (dispatch) => {
  const returnFetch = await fetchFoodPerAreaList();
  dispatch(foodPerAreaListSuccess(returnFetch));
};

export const foodPerAreaFilterSuccess = (payload) => ({
  type: FOOD_PER_AREA_FILTER_SUCCESS,
  payload,
});

export const foodPerAreaFilterFetch = (area) => async (dispatch) => {
  const returnFetch = await fetchFoodPerAreaFilter(area);
  dispatch(foodPerAreaFilterSuccess(returnFetch));
};

export const foodPerAreaAllFetch = (area) => async (dispatch) => {
  const returnFetch = await fetchAPIList(area);
  dispatch(foodPerAreaFilterSuccess(returnFetch));
};
