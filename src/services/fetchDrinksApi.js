const DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINKS_API_URL_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const DRINKS_API_URL_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

const fetchDrinksApi = async (drinkFilter) => {
  const { searchText, search } = drinkFilter;
  if (search === '') {
    const response = await fetch(DRINKS_API_URL);
    return response.json();
  }
  if (search === 'Nome') {
    const response = await fetch(`${DRINKS_API_URL}${searchText}`);
    return response.json();
  }
  if (search === 'Primeira letra') {
    const response = await fetch(`${DRINKS_API_URL_LETTER}${searchText}`);
    return response.json();
  }
  if (search === 'Ingrediente') {
    const response = await fetch(`${DRINKS_API_URL_INGREDIENT}${searchText}`);
    return response.json();
  }
};

export default fetchDrinksApi;
