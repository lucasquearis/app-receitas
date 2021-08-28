import { FOOD_CATEGORIES_SUCCESS, FOOD_LIST_SUCCESS } from '../actions/actionFood';

const INITIAL_STATE = {
  foodCardList: [],
  foodCategoriesList: [],
};

const cardLenght = 12;
const categoriesListLenght = 5;

function foodReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FOOD_LIST_SUCCESS:
    return {
      ...state,
      foodCardList: action.payload.slice(0, cardLenght),
    };
  case FOOD_CATEGORIES_SUCCESS:
    return {
      ...state,
      foodCategoriesList: action.payload.slice(0, categoriesListLenght),
    };
  default:
    return state;
  }
}

export default foodReducer;
