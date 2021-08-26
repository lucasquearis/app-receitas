export const TMP = 'TMP';
export const action = (payload) => ({ type: TMP, payload });
export const newAction = 'New_action';

export const GET_SURPRISE = 'GET_SURPRISE';
export const GET_SURPRISE_SUCCESS = 'GET_SURPRISE_SUCCESS';
export const GET_SURPRISE_ERROR = 'GET_SURPRISE_ERROR';

export const getSurprise = () => ({
  type: GET_SURPRISE,
});

export const getSurpriseSuccess = (payload) => ({
  type: GET_SURPRISE_SUCCESS, payload,
});

export const getSurpriseError = (error) => ({
  type: GET_SURPRISE_ERROR, error,
});

export const fetchSurprise = () => (dispatch) => {
  dispatch(getSurprise());
  const API_SURPRISE = 'https://www.themealdb.com/api/json/v1/1/random.php';
  fetch(API_SURPRISE)
    .then((response) => response.json())
    .then(({ meals }) => dispatch(getSurpriseSuccess(meals)))
    .catch((error) => dispatch(getSurpriseError(error)));
}

// `https://www.themealdb.com/api/json/v1/1/random.php`

// `https://www.thecocktaildb.com/api/json/v1/1/random.php`