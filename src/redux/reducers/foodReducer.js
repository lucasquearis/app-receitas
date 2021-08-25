export const NEW_FOOD_SEARCH = 'NEW_FOOD_SEARCH';
export const FOOD_RESPONSE = 'FOOD_RESPONSE';
export const FOOD_ERROR_RESPONSE = 'FOOD_ERROR_RESPONSE';
export const FOOD_FILTER = 'FOOD_FILTER';

const INITIAL_STATE = {
  meals: [],
  loading: true,
  error: false,
  filter: false,
};

const food = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_FOOD_SEARCH:
    return {
      ...state,
      loading: true,
    };
  case FOOD_RESPONSE:
    return {
      ...state,
      loading: false,
      meals: action.payload,
    };
  case FOOD_ERROR_RESPONSE:
    return {
      ...state,
      loading: false,
      error: true,
    };
  case FOOD_FILTER:
    return {
      ...state,
      filter: action.payload,
    };
  default:
    return state;
  }
};

export default food;
