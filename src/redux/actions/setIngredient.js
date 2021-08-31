import { SET_INGREDIENT } from '../types';

const setIngredient = (ingredient) => ({
  type: SET_INGREDIENT,
  payload: { ingredient },
});

export default setIngredient;
