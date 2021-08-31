export async function fetchRandomFood() {
  const fetchRandomFoods = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  return fetchRandomFoods.json();
}

export async function fetchRandomDrink() {
  const fetchRandomDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  return fetchRandomDrinks.json();
}
