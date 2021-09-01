import {
  REQUEST_ITEMS,
  REQUEST_SUCCESS,
  STORE_ITEMS,
  STORE_IN_PROCESS_FOOD,
  STORE_IN_PROCESS_COCKTAIL,
  REQUEST_OK,
} from './actionsType';

export const actionStoreItems = (payload) => ({ type: STORE_ITEMS, payload });

export const actionRequestItems = () => ({ type: REQUEST_ITEMS });

export const actionRequestOk = () => ({ type: REQUEST_OK });

export const actionRequestSuccess = (payload) => ({ type: REQUEST_SUCCESS, payload });

export const actionStoreInProcessFood = (payload) => ({
  type: STORE_IN_PROCESS_FOOD, payload,
});

export const actionStoreInProcessCocktail = (payload) => ({
  type: STORE_IN_PROCESS_COCKTAIL, payload,
});

export const temp = 0;
