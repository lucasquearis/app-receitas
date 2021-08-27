export const NEW_FOOD_SEARCH = 'NEW_FOOD_SEARCH';
export const FOOD_RESPONSE = 'FOOD_RESPONSE';
export const FOOD_ERROR_RESPONSE = 'FOOD_ERROR_RESPONSE';
export const FOOD_FILTER = 'FOOD_FILTER';
export const FOOD_PARAMETER_REDIRECT = 'FOOD_PARAMETER_REDIRECT';
export const FOOD_PARAMETER_RESET = 'FOOD_PARAMETER_RESET';

const INITIAL_STATE = {
  meals: [],
  loading: true,
  error: false,
  filter: false,
  redirectedWithParameter: { parameter: 'none', term: '' },
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
  case FOOD_PARAMETER_REDIRECT:
    return {
      ...state,
      redirectedWithParameter: action.payload,
    };
  case FOOD_PARAMETER_RESET:
    return {
      ...state,
      redirectedWithParameter: { parameter: 'none', term: '' },
    };
  default:
    return state;
  }
};

export default food;
