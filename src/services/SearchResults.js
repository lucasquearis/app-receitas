export async function byFoodIngredient(ingredient) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}

export async function byFoodName(name) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}

export async function byFoodFirstLetter(firstLetter) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return meals;
}

export async function byDrinkIngredient(ingredient) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return drinks;
}

export async function byDrinkName(name) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return drinks;
}

export async function byDrinkFirstLetter(firstLetter) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return drinks;
}
