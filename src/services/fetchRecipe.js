const RECIPE_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export default async function fetchRecipe(id) {
  try {
    const req = await fetch(`${RECIPE_URL}${id}`);
    const resp = await req.json();
    return resp.meals[0];
  } catch (e) {
    console.log(e);
  }
}
