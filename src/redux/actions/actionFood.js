import {
  fetchAPICategories,
  fetchAPIList,
  fetchAPIListByCategory,
  fetchFoodRandom,
} from '../../services/FoodAPIFetch';

export const FOOD_LIST_SUCCESS = 'FOOD_LIST_SUCCESS';
export const FOOD_CATEGORIES_SUCCESS = 'FOOD_CATEGORIES_SUCCESS';
export const FOOD_RANDOM_SUCCESS = 'FOOD_RANDOM_SUCCESS';

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
