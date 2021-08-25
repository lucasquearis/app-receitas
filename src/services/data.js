const URL_SETUP_BY_RADIO_BUTTON = {
  ingredient: 'filter.php?i',
  name: 'search.php?s',
  letter: 'search.php?f',
};

const URL_SETUP_BY_PAGE = new Map();
URL_SETUP_BY_PAGE.set('/comidas', 'themealdb');
URL_SETUP_BY_PAGE.set('/bebidas', 'thecocktaildb');

const BODY_URL = '.com/api/json/v1/1/';

const TEXT_ALERT_ONE = 'Sua busca deve conter somente 1 (um) caracter';

export {
  URL_SETUP_BY_RADIO_BUTTON,
  URL_SETUP_BY_PAGE,
  TEXT_ALERT_ONE,
  BODY_URL };
