const MEAL_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEAL_API_URL_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const MEAL_API_URL_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

const fetchMealApi = async (foodFilter) => {
  const { searchText, search } = foodFilter;
  if (search === '') {
    const response = await fetch(MEAL_API_URL);
    return response.json();
  }
  if (search === 'Nome') {
    const response = await fetch(`${MEAL_API_URL}${searchText}`);
    return response.json();
  }
  if (search === 'Primeira letra') {
    const response = await fetch(`${MEAL_API_URL_LETTER}${searchText}`);
    return response.json();
  }
  if (search === 'Ingrediente') {
    const response = await fetch(`${MEAL_API_URL_INGREDIENT}${searchText}`);
    return response.json();
  }
};

export default fetchMealApi;
