import {
  GET_RECIPE,
  GET_RECIPE_SUCCESS,
  GET_RECIPE_ERROR,
} from './actionTypes';

const getRecipe = () => ({
  type: GET_RECIPE,
});

const getRecipeSuccess = (responseRecipe) => ({
  type: GET_RECIPE_SUCCESS,
  payload: responseRecipe,
});

const getRecipeError = (error) => ({
  type: GET_RECIPE_ERROR,
  error,
});

export const fetchRecipe = () => async (dispatch) => {
  dispatch(getRecipe());
  const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${1}`;
  const response = await fetch(endPoint);
  // console.log(response)
  const responseJson = await response.json();
  // console.log(responseJson)
  try {
    dispatch(getRecipeSuccess(responseJson));
  } catch (error) {
    dispatch(getRecipeError(error));
  }
};

export default fetchRecipe;
