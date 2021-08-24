import getFoodCategories from '../../services/fetchFoodCategories';

export const GET_CATEGORIES_FOOD = 'GET_CATEGORIES_FOOD';

export const getFetchCategories = (resposta) => ({
  type: GET_CATEGORIES_FOOD,
  payload: resposta,
});

export const getCategoriesFood = () => async (dispatch) => {
  const resp = await getFoodCategories();
  dispatch(getFetchCategories(resp));
};
