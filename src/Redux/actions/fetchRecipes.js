import {
  RECIPE,
  RECIPE_SUCCESS,
  RECIPE_ERROR,
} from './actionTypes';

const getRecipe = () => ({
  type: RECIPE,
});

const getRecipeSuccess = (responseRecipe) => ({
  type: RECIPE_SUCCESS,
  payload: responseRecipe,
});

const getRecipeError = (error) => ({
  type: RECIPE_ERROR,
  error,
});

export const fetchRecipe = (id) => async (dispatch) => {
  dispatch(getRecipe());
  const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endPoint);
  const responseJson = await response.json();
  try {
    dispatch(getRecipeSuccess(responseJson.meals));
  } catch (error) {
    dispatch(getRecipeError(error));
  }
};

export default fetchRecipe;
