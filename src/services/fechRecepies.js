export async function fetchMeals(callback) {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(endpoint);
  const response = await request.json();
  callback(response.meals);
}

export async function fetchDrinks(callback) {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const request = await fetch(endpoint);
  const response = await request.json();
  callback(response.drinks);
}
