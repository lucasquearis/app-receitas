import DrinkAPIFetch from '../../services/DrinkAPIFetch';

export const DRINK_LIST_SUCCESS = 'DRINK_LIST_SUCCESS';

export const successDrinkList = (payload) => ({
  type: DRINK_LIST_SUCCESS,
  payload,
});

export const drinkFetch = () => async (dispatch) => {
  const returnFetch = await DrinkAPIFetch();
  dispatch(successDrinkList(returnFetch));
};
