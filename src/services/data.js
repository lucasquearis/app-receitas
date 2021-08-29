const URL_RADIO_BUTTON = {
  ingredient: 'filter.php?i',
  name: 'search.php?s',
  letter: 'search.php?f',
};
const LOCAL_STORAGE_REC_PROGRESS = JSON.parse(localStorage.getItem('inProgressRecipes'));
const OBJ_LOCAL_STORAGE = { cocktails: { chave: [] }, meals: { chave: [] } };
const MEAL_OBJ = { textValue: '', radioValue: 'ingredient', pathname: '/comidas' };
const DRINK_OBJ = { textValue: '', radioValue: 'name', pathname: '/bebidas' };
const ALERT_ONE = 'Sua busca deve conter somente 1 (um) caracter';
const ALERT_TWO = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
const START_CARD = 0;
const NUMBER_CARDS = 12;

export {
  URL_RADIO_BUTTON,
  ALERT_ONE,
  ALERT_TWO,
  START_CARD,
  NUMBER_CARDS,
  MEAL_OBJ,
  DRINK_OBJ,
  OBJ_LOCAL_STORAGE,
  LOCAL_STORAGE_REC_PROGRESS,
};
