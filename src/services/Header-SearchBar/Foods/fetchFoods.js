const fetchFoods = async () => {
  const URL_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const result = await fetch(URL_API);
  const meals = result.json();
  return meals;
};

export default fetchFoods;
