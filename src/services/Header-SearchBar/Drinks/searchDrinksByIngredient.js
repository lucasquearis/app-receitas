const searchDrinksByIngredient = async (ingredient) => {
  const URL_API = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const result = await fetch(URL_API);
  const data = result.json();
  return data;
};

export default searchDrinksByIngredient;
