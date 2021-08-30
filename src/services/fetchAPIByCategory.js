export default async function fetchAPICategories(type, category) {
  let bodyURL = null;
  let key = null;
  if (type === '/comidas') { bodyURL = 'themealdb'; key = 'meals'; }
  if (type === '/bebidas') { bodyURL = 'thecocktaildb'; key = 'drinks'; }

  const RECIPE_CARDS_QTD = 12;

  try {
    const URL = `https://www.${bodyURL}.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(URL);
    const { [key]: results } = await response.json();
    const recipeSlicedList = results.slice(0, RECIPE_CARDS_QTD);
    return recipeSlicedList;
  } catch (error) {
    console.log(error);
  }
}
