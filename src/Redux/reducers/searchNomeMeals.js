import {
  SEARCH_NOME_MEALS,
  SEARCH_NOME_MEALS_SUCCESS,
  SEARCH_NOME_MEALS_ERROR,
} from '../actions/actionTypes';

const initialState = { search: [], loading: false, error: null };

const searchNomeReducer = (state = initialState, action) => {
  switch (action.type) {
  case SEARCH_NOME_MEALS:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case SEARCH_NOME_MEALS_SUCCESS:
    return {
      ...state,
      loading: false,
      search: [...action.payload],
    };
  case SEARCH_NOME_MEALS_ERROR:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default searchNomeReducer;
