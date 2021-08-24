const DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const fetchDrinksApi = async () => {
  const response = await fetch(DRINKS_API_URL);
  return response.json();
};

export default fetchDrinksApi;
