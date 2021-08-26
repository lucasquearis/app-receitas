export default async function fetchAPICategories(type) {
  let bodyURL = null;
  let key = null;
  if (type === '/comidas') { bodyURL = 'themealdb'; key = 'meals'; }
  if (type === '/bebidas') { bodyURL = 'thecocktaildb'; key = 'drinks'; }

  const CATEGORIES_QTD = 5;

  try {
    const URL = `https://www.${bodyURL}.com/api/json/v1/1/list.php?c=list`;
    const response = await fetch(URL);
    const { [key]: results } = await response.json();
    const categories = results.map(({ strCategory }) => strCategory);
    const categoriesList = categories.slice(0, CATEGORIES_QTD);
    return categoriesList;
  } catch (error) {
    console.log(error);
  }
}
