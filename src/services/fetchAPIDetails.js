async function fetchAPIDetails(type, idUrl) {
  let bodyURL = null;
  let key = null;
  // if (type === '/comidas') { bodyURL = 'themealdb'; key = 'meals'; }
  // if (type === '/bebidas') { bodyURL = 'thecocktaildb'; key = 'drinks'; }
  if (type.includes('bebida')) { bodyURL = 'thecocktaildb'; key = 'drinks'; }
  if (type.includes('comidaaa')) { bodyURL = 'themealdb'; key = 'meals'; }

  const id = idUrl.replace(/\D/g, '');

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
