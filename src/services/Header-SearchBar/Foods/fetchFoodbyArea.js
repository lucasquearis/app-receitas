const fetchFoodbyArea = async (area) => {
  const URL_API = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const result = await fetch(URL_API);
  const data = result.json();
  return data;
};

export default fetchFoodbyArea;
