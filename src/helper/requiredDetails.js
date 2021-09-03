import getDetails from '../services/FetchDetails';

export async function consultFood(id) {
  const END_POINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { meals } = await getDetails(END_POINT);
  return meals[0];
}

export async function consultDrink(id) {
  const END_POINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { drinks } = await getDetails(END_POINT);
  return drinks[0];
}

export async function getDrinkRecommendations() {
  const count = 0;
  const max = 6;

  const END_POINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const { drinks } = await getDetails(END_POINT);
  const result = drinks.slice(count, max);
  return result;
}

export async function getMealsRecommendations() {
  const count = 0;
  const max = 6;

  const END_POINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { meals } = await getDetails(END_POINT);
  const result = meals.slice(count, max);
  return result;
}

export function verificationDoneRecipe(id) {
  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipe) {
    const result = doneRecipe.some((item) => item.id === id);
    return result;
  } return false;
}

export function verificatioinProgressRecipe(id) {
  let inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgress) inProgress = [];
  const categories = Object.keys(inProgress);
  const idRecipe = categories.map((item) => Object.keys(inProgress[item]));
  return idRecipe.some((item) => item[0] === id);
}
