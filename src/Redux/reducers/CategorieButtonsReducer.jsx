import { GET_CATEGORIES_FOOD } from '../actions/categorieButtonsAct';

const INITIAL_STATE = {
  foodCategories: [],
  isLoading: true,
};

const foodcategories = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  const CINCO = 5;

  switch (type) {
  case GET_CATEGORIES_FOOD:
    return { ...state, foodCategories: payload.slice(0, CINCO), isLoading: false };

  default:
    return state;
  }
};

export default foodcategories;
