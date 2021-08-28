import { fetchAPICategories, fetchAPIList } from '../../services/FoodAPIFetch';

export const FOOD_LIST_SUCCESS = 'FOOD_LIST_SUCCESS';
export const FOOD_CATEGORIES_SUCCESS = 'FOOD_CATEGORIES_SUCCESS';

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
