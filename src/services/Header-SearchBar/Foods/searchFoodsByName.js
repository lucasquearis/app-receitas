const searcFoodsByName = async (foodName) => {
  const URL_API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
  const result = await fetch(URL_API);
  const data = result.json();
  return data;
};

export default searcFoodsByName;
