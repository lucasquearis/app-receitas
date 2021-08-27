export const NEW_DRINK_SEARCH = 'NEW_DRINK_SEARCH';
export const DRINK_RESPONSE = 'DRINK_RESPONSE';
export const DRINK_ERROR_RESPONSE = 'DRINK_ERROR_RESPONSE';
export const DRINK_PARAMETER_REDIRECT = 'DRINK_PARAMETER_REDIRECT';
export const DRINK_PARAMETER_RESET = 'DRINK_PARAMETER_RESET';

const INITIAL_STATE = {
  drinks: [],
  loading: true,
  error: false,
  redirectedWithParameter: { parameter: 'none', term: '' },
};

const drink = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_DRINK_SEARCH:
    return {
      ...state,
      loading: true,
    };
  case DRINK_RESPONSE:
    return {
      ...state,
      loading: false,
      drinks: action.payload,
    };
  case DRINK_ERROR_RESPONSE:
    return {
      ...state,
      loading: false,
      error: true,
    };
  case DRINK_PARAMETER_REDIRECT:
    return {
      ...state,
      redirectedWithParameter: action.payload,
    };
  case DRINK_PARAMETER_RESET:
    return {
      ...state,
      redirectedWithParameter: { parameter: 'none', term: '' },
    };
  default:
    return state;
  }
};

export default drink;
