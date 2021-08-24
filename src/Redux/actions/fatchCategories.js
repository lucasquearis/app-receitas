import {
  MEAL_CATEGORIE,
  MEAL_CATEGORIE_SUCCESS,
  MEAL_CATEGORIE_ERROR,
} from './actionTypes';

// para acionar esse fach basta chamar a action fatchMealsCategories
// o Map devera ser realizado na chave "categories do redeux" (pode trocar o nome se acharem necessario só comunicar o time )
// para acessar podemos usar o mapStateToProps buscando por state.categories

const getMealsl = () => ({
  type: MEAL_CATEGORIE,
});

const getMealslSuccess = (responseMeals) => ({
  type: MEAL_CATEGORIE_SUCCESS,
  payload: responseMeals,
});

const getMealslError = (erro) => ({
  type: MEAL_CATEGORIE_ERROR,
  erro,
});

export const fatchMealsCategories = () => async (dispatch) => {
  dispatch(getMealsl());
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  // esse e o endpoint pra buscar as categorias
  const response = await fetch(endPoint);
  const responseJson = await response.json();
  // o responseJson e um ubjeto que tem uma unica chave chamada meals
  try {
    dispatch(getMealslSuccess(responseJson.meals));
    // a chave meals é um array de objetos podendo assim usarmos o spreed operator la no reducer
  } catch (error) {
    dispatch(getMealslError(error));
  }
};

export default fatchMealsCategories;
