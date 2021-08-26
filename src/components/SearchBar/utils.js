export const fetchApi = async (url) => {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
};

const setByType = async (type, search, setItems, { urlDetail, letter }) => {
  const response = await fetchApi(`https://www.${type}.com/api/json/v1/1/${urlDetail}.php?${letter}=${search.textValue}`);
  if (Object.values(response)[0] === null) {
    // eslint-disable-next-line no-alert
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  } else {
    setItems(response);
  }
};

export const searchOnClick = (search, setItems) => {
  const path = window.location.pathname;
  let type;
  if (path === '/comidas') type = 'themealdb';
  if (path === '/bebidas') type = 'thecocktaildb';
  if (search.radioValue === 'Ingredientes') {
    setByType(type, search, setItems, { urlDetail: 'filter', letter: 'i' });
  } else if (search.radioValue === 'Nome') {
    setByType(type, search, setItems, { urlDetail: 'search', letter: 's' });
  } else if (search.radioValue === 'Primeira letra') {
    if (search.textValue.length === 1) {
      setByType(type, search, setItems, { urlDetail: 'search', letter: 'f' });
    } else {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }
};
