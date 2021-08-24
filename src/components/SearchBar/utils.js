export const fetchApi = async (url) => {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
};

export const searchOnClick = async (search, setItems) => {
  const path = window.location.pathname;
  let type;
  if (path === '/comidas') type = 'themealdb';
  if (path === '/bebidas') type = 'thecocktaildb';
  if (search.radioValue === 'Ingredientes') {
    const ingredients = await fetchApi(`https://www.${type}.com/api/json/v1/1/filter.php?i=${search.textValue}`);
    setItems(ingredients);
  } else if (search.radioValue === 'Nome') {
    const name = await fetchApi(`https://www.${type}.com/api/json/v1/1/search.php?s=${search.textValue}`);
    setItems(name);
  } else if (search.radioValue === 'Primeira letra') {
    if (search.textValue.length === 1) {
      const firstLetter = await fetchApi(`https://www.${type}.com/api/json/v1/1/search.php?f=${search.textValue}`);
      setItems(firstLetter);
    } else {
      // eslint-disable-next-line no-alert
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }
};
