import { GET_CATEGORIES_FOOD } from '../actions/categorieButtonsAct';

const INITIAL_STATE = {
  foodCategories: [],
};

const foodcategories = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
  case GET_CATEGORIES_FOOD:
    return { ...state, foodcategories: payload };

  default:
    return payload;
  }
};

export default foodcategories;
