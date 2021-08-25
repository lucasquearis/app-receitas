const URL_RADIO_BUTTON = {
  ingredient: 'filter.php?i',
  name: 'search.php?s',
  letter: 'search.php?f',
};

const URL_PAGE = new Map([['/comidas', 'themealdb'], ['/bebidas', 'thecocktaildb']]);
const BODY_URL = '.com/api/json/v1/1/';
const ALERT_ONE = 'Sua busca deve conter somente 1 (um) caracter';
const ALERT_TWO = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

export {
  URL_RADIO_BUTTON,
  URL_PAGE,
  ALERT_ONE,
  ALERT_TWO,
  BODY_URL };
