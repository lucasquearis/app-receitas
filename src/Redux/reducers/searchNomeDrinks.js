import {
  SEARCH_NOME_DRINKS,
  SEARCH_NOME_DRINKS_SUCCESS,
  SEARCH_NOME_DRINKS_ERROR,
} from '../actions/actionTypes';

const initialState = { search: [], loading: false, error: null };

const searchNomeDrinksReducer = (state = initialState, action) => {
  switch (action.type) {
  case SEARCH_NOME_DRINKS:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case SEARCH_NOME_DRINKS_SUCCESS:
    return {
      ...state,
      loading: false,
      search: [...action.payload],
    };
  case SEARCH_NOME_DRINKS_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default searchNomeDrinksReducer;
