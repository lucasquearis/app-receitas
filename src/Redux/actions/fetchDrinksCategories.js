import {
  DRINKS_CATEGORIES,
  DRINKS_CATEGORIES_SUCCESS,
  DRINKS_CATEGORIES_ERROR,
} from './actionTypes';

const getDrinksCategories = () => ({
  type: DRINKS_CATEGORIES,
});

const getDrinksCategoriesSuccess = (drinksCategories) => ({
  type: DRINKS_CATEGORIES_SUCCESS,
  payload: drinksCategories,
});

const getDrinksCategoriesError = (error) => ({
  type: DRINKS_CATEGORIES_ERROR,
  payload: error,
});

const fetchDrinksCategories = () => async (dispatch) => {
  dispatch(getDrinksCategories());
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endPoint);
  const json = await response.json();
  try {
    dispatch(getDrinksCategoriesSuccess(json.drinks));
  } catch (error) {
    dispatch(getDrinksCategoriesError(error));
  }
};

export default fetchDrinksCategories;
