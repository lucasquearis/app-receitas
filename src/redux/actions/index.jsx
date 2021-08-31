export const TMP = 'TMP';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const START_FAVORITES = 'START_FAVORITES';

export const action = (payload) => ({ type: TMP, payload });
export const newAction = 'New_action';

export const removeFavorite = (payload) => ({ type: REMOVE_FAVORITE, payload });
export const addFavorite = (payload) => ({ type: ADD_FAVORITE, payload });
export const startFavorites = () => ({ type: START_FAVORITES });
