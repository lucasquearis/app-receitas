export const NEW_FOOD_SEARCH = 'NEW_FOOD_SEARCH';
export const FOOD_RESPONSE = 'FOOD_RESPONSE';
export const FOOD_ERROR_RESPONSE = 'FOOD_ERROR_RESPONSE';

const INITIAL_STATE = {
  meals: [],
  loading: true,
  error: false,
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
  default:
    return state;
  }
};

export default food;
