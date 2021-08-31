import {
  COCKTAIL,
  COCKTAIL_SUCCESS,
  COCKTAIL_ERROR,
} from './actionTypes';

const getCocktail = () => ({
  type: COCKTAIL,
});

const getCocktailSuccess = (responseCocktail) => ({
  type: COCKTAIL_SUCCESS,
  payload: responseCocktail,
});

const getCocktailError = (error) => ({
  type: COCKTAIL_ERROR,
  error,
});

const fetchCocktail = (id) => async (dispatch) => {
  dispatch(getCocktail());
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(endPoint);
  const responseJson = await response.json();
  // console.log(responseJson);
  try {
    dispatch(getCocktailSuccess(responseJson.drinks));
  } catch (error) {
    dispatch(getCocktailError(error));
  }
};

export default fetchCocktail;
