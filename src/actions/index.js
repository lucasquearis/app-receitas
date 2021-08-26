import { REQUEST_ITEMS, REQUEST_SUCCESS, STORE_ITEMS } from './actionsType';

export const actionStoreItems = (payload) => ({ type: STORE_ITEMS, payload });

export const actionRequestItems = ({ type: REQUEST_ITEMS });

export const actionRequestSuccess = (payload) => ({ type: REQUEST_SUCCESS, payload });

export const temp = 0;
