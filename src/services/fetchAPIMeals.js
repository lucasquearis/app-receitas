async function fetchAPIMeals() {
  // let bodyURL = null;
  const key = 'meals';
  // if (type === '/comidas') { bodyURL = 'themealdb'; key = 'meals'; }
  // if (type === '/bebidas') { bodyURL = 'thecocktaildb'; key = 'drinks'; }

  try {
    const URL = 'https://www.$themealbd.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const { [key]: results } = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export default fetchAPIMeals;
