import FoodAPIFetch from '../../services/FoodAPIFetch';

export const FOOD_LIST_SUCCESS = 'FOOD_LIST_SUCCESS';

export const successFoodList = (payload) => ({
  type: FOOD_LIST_SUCCESS,
  payload,
});

export const foodFetch = () => async (dispatch) => {
  const returnFetch = await FoodAPIFetch();
  dispatch(successFoodList(returnFetch));
};
