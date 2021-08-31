export default async function fetchAPIDetails(type, id) {
  let bodyURL = null;
  if (type === '/comidas') bodyURL = 'themealdb';
  if (type === '/bebidas') bodyURL = 'thecocktaildb';

  try {
    const URL = `https://www.${bodyURL}.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(URL);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}
