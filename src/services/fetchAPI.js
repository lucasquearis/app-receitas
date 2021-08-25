async function fetchAPI(type) {
  let bodyURL = null;
  let key = null;
  if (type === '/comidas') { bodyURL = 'themealdb'; key = 'meals'; }
  if (type === '/bebidas') { bodyURL = 'thecocktaildb'; key = 'drinks'; }

  try {
    const URL = `https://www.${bodyURL}.com/api/json/v1/1/search.php?s=`;
    const response = await fetch(URL);
    const { [key]: results } = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export default fetchAPI;
