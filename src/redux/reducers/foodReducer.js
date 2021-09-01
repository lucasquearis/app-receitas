import {
  FOOD_CATEGORIES_SUCCESS,
  FOOD_LIST_SUCCESS,
  FOOD_RANDOM_SUCCESS,
  FOOD_INGREDIENTS_LIST_SUCCESS,
  FOOD_HANDLECLICK_INGREDIENT,
  FOOD_PER_AREA_LIST_SUCCESS,
  FOOD_PER_AREA_FILTER_SUCCESS,
} from '../actions/actionFood';

const INITIAL_STATE = {
  foodCardList: [],
  foodCategoriesList: [],
  foodRandom: [],
  foodIngredientsList: [],
  foodIsClicked: false,
  foodPerAreaList: [],
  foodPerAreaFilter: [],
};

const cardListLenght = 12;
const categoriesListLenght = 5;

function foodReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FOOD_LIST_SUCCESS:
    return {
      ...state,
      foodCardList: action.payload.slice(0, cardListLenght),
    };
  case FOOD_CATEGORIES_SUCCESS:
    return {
      ...state,
      foodCategoriesList: action.payload.slice(0, categoriesListLenght),
    };
  case FOOD_RANDOM_SUCCESS:
    return {
      ...state,
      foodRandom: action.payload[0].idMeal,
    };
  case FOOD_INGREDIENTS_LIST_SUCCESS:
    return {
      ...state,
      foodIngredientsList: action.payload.slice(0, cardListLenght),
    };
  case FOOD_HANDLECLICK_INGREDIENT:
    return {
      ...state,
      foodIsClicked: action.payload,
    };
  case FOOD_PER_AREA_LIST_SUCCESS:
    return {
      ...state,
      foodPerAreaList: action.payload,
    };
  case FOOD_PER_AREA_FILTER_SUCCESS:
    return {
      ...state,
      foodPerAreaFilter: action.payload.slice(0, cardListLenght),
    };
  default:
    return state;
  }
}

export default foodReducer;
