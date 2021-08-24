const MEAL_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const fetchMealApi = async () => {
  const response = await fetch(MEAL_API_URL);
  return response.json();
};

export default fetchMealApi;
