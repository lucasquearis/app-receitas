import {
	GET_RECIPE,
	GET_RECIPE_ERROR,
	GET_RECIPE_SUCCESS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
	recipes: [],
	loading: false,
	error: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_RECIPE:
			return {
				...state,
				loading: true,
		  }
		case GET_RECIPE_SUCCESS:
			return {
				...state,
				recipes: [...action.payload],
				loading: false,
			}
		case GET_RECIPE_ERROR:
			return {
				...state,
        error: action.payload,
				loading: false, 
			}
		default:
      return state;
	}
};
