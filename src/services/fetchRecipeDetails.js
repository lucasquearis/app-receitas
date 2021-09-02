async function fetchRecipeDetails(database, id) {
  const URL = `https://www.${database}.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export default fetchRecipeDetails;
