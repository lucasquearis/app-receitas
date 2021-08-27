import { GET_CATEGORIES_FOOD } from '../actions/categorieButtonsAct';

const INITIAL_STATE = {
  foodCategories: [],
  isLoading: true,
};

const foodcategories = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  const SEIS = 6;

  switch (type) {
  case GET_CATEGORIES_FOOD:
    payload.meals.unshift({ strCategory: 'All' });
    console.log(payload);
    return {
      ...state,
      foodCategories: payload.meals.slice(0, SEIS),
      isLoading: false };

  default:
    return state;
  }
};

export default foodcategories;
