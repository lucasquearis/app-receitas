import { FAVORITE } from './actionTypes';

const addFavorite = (payload) => ({
  type: FAVORITE,
  payload,
});

export default addFavorite;
