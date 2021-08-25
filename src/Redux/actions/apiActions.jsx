import getFood from '../../services/FetchFoods';
import getDrink from '../../services/FetchDrinks';
import getDetails from '../../services/FetchDetails';

export const GET_FOODS_SUCCESS = 'GET_FOODS_SUCCESS';
export const GET_DRINKS_SUCCESS = 'GET_DRINKS_SUCCESS';
export const GET_DETAILS_SUCCESS = 'GET_DETAILS_SUCCESS';

export const getFoodsSuccess = (meal) => ({
  type: GET_FOODS_SUCCESS,
  payload: meal,
});

export const getDrinksSuccess = (cocktail) => ({
  type: GET_DRINKS_SUCCESS,
  payload: cocktail,
});

export const getDetailsSuccess = (detail) => ({
  type: GET_DETAILS_SUCCESS,
  payload: detail,
});

export function getFoodsApi(api) {
  return async (dispatch) => {
    const meal = await getFood(api);
    dispatch(getFoodsSuccess(meal));
  };
}

export function getDrinksApi(api) {
  return async (dispatch) => {
    const cocktail = await getDrink(api);
    dispatch(getDrinksSuccess(cocktail));
  };
}

export function getDetailsApi(api) {
  return async (dispatch) => {
    const detail = await getDetails(api);
    dispatch(getDetailsSuccess(detail));
  };
}
