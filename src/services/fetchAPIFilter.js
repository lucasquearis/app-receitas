async function fetchAPI(type, filter, searchInput) {
  let response = null;
  let bodyURL = null;
  let key = null;
  if (type === 'Comidas') { bodyURL = 'themealdb'; key = 'meals'; }
  if (type === 'Bebidas') { bodyURL = 'thecocktaildb'; key = 'drinks'; }

  try {
    if (filter === 'ingredient') {
      const URL = `https://www.${bodyURL}.com/api/json/v1/1/filter.php?i=${searchInput}`;
      response = await fetch(URL);
    }
    if (filter === 'name') {
      const URL = `https://www.${bodyURL}.com/api/json/v1/1/search.php?s=${searchInput}`;
      response = await fetch(URL);
    }
    if (filter === 'firstLetter') {
      const URL = `https://www.${bodyURL}.com/api/json/v1/1/search.php?f=${searchInput}`;
      response = await fetch(URL);
    }
    const { [key]: results } = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
}

export default fetchAPI;
