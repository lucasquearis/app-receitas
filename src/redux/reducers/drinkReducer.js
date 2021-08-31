import {
  DRINK_CATEGORIES_SUCCESS,
  DRINK_INGREDIENTS_LIST_SUCCESS,
  DRINK_LIST_SUCCESS,
  DRINK_RANDOM_SUCCESS,
  DRINK_HANDLECLICK_INGREDIENT,
} from '../actions/actionDrink';

const INITIAL_STATE = {
  drinkCardList: [],
  drinkCategoriesList: [],
  drinkRandom: [],
  drinkIngredientsList: [],
  drinkIsClicked: false,
};

const cardListLenght = 12;
const categoriesListLenght = 5;

function drinkReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DRINK_LIST_SUCCESS:
    return {
      ...state,
      drinkCardList: action.payload.slice(0, cardListLenght),
    };
  case DRINK_CATEGORIES_SUCCESS:
    return {
      ...state,
      drinkCategoriesList: action.payload.slice(0, categoriesListLenght),
    };
  case DRINK_RANDOM_SUCCESS:
    return {
      ...state,
      drinkRandom: action.payload[0].idDrink,
    };
  case DRINK_INGREDIENTS_LIST_SUCCESS:
    return {
      ...state,
      drinkIngredientsList: action.payload.slice(0, cardListLenght),
    };
  case DRINK_HANDLECLICK_INGREDIENT:
    return {
      ...state,
      drinkIsClicked: action.payload,
    };
  default:
    return state;
  }
}

export default drinkReducer;
