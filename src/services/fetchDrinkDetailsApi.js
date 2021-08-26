const fetchMealDetailsApi = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(url);
  return request.json();
};

export default fetchMealDetailsApi;
