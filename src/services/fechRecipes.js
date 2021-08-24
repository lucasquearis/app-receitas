export async function fetchMeals(callback, endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
  try {
    const request = await fetch(endpoint);
    const response = await request.json();
    callback(response.meals);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

export async function fetchDrinks(callback, endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
  try {
    const request = await fetch(endpoint);
    const response = await request.json();
    callback(response.drinks);
  } catch (err) {
    console.log(err);
  }
}
