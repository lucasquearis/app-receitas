async function fetchAPIDetails(type, id) {
  let bodyURL = null;
  let key = null;
  if (type === '/comidas') { bodyURL = 'themealdb'; key = 'meals'; }
  if (type === '/bebidas') { bodyURL = 'thecocktaildb'; key = 'drinks'; }

  try {
    const URL = `https://www.${bodyURL}.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(URL);
    const { [key]: results } = await response.json();
    return results[0];
  } catch (error) {
    console.log(error);
  }
}

export default fetchAPIDetails;
