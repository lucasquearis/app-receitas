export async function fetchRandomMeal() {
  const fetchRM = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  return fetchRM.json();
}

export async function fetchRandomDrink() {
  const fetchRD = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  return fetchRD.json();
}
