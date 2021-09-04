const searchFoodId = async (id) => {
  const URL_API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(URL_API);
  const data = result.json();
  return data;
};

export default searchFoodId;
