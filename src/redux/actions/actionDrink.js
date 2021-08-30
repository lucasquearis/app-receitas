import {
  fetchAPICategories,
  fetchAPIList,
  fetchAPIListByCategory,
} from '../../services/DrinkAPIFetch';

export const DRINK_LIST_SUCCESS = 'DRINK_LIST_SUCCESS';
export const DRINK_CATEGORIES_SUCCESS = 'DRINK_CATEGORIES_SUCCESS';

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
