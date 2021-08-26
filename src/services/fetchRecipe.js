const MEAL_RECIPE_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_RECIPE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export async function fetchMealRecipe(id) {
  try {
    const req = await fetch(`${MEAL_RECIPE_URL}${id}`);
    const resp = await req.json();
    return resp.meals[0];
  } catch (e) {
    console.log(e);
  }
}

export async function fetchDrinkRecipe(id) {
  try {
    const req = await fetch(`${DRINK_RECIPE_URL}${id}`);
    const resp = await req.json();
    return resp.drinks[0];
  } catch (e) {
    console.log(e);
  }
}
