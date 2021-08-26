const fetchMealDetailsApi = async (id) => {
  console.log(id);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(url);
  return request.json();
};

export default fetchMealDetailsApi;
