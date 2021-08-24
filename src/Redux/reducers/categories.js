import {
  MEAL_CATEGORIE,
  MEAL_CATEGORIE_SUCCESS,
  MEAL_CATEGORIE_ERROR,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  loading: false,
  categories: [],
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case MEAL_CATEGORIE:
    return {
      ...state,
      loading: true,
      // acrescentei a logica do loading caso nessessario pra tratar erros de assincronicidade
    };
  case MEAL_CATEGORIE_SUCCESS:
    return {
      ...state,
      categories: [...action.payload],
      // aqui interamos o nosso estado com as categorias fazendo uma copia do estado
      loading: false,
    };
  case MEAL_CATEGORIE_ERROR:
    return {
      ...state,
      error: action.payload.erro,
      loading: false,
    };
  default:
    return state;
  }
};
