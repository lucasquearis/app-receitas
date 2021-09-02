export async function fetchArea() {
  const areaAPI = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  return areaAPI.json();
}

export async function fetchMeals() {
  const mealsAPI = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  return mealsAPI.json();
}

export async function fetchRegionMeal(region) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${region}`;
  const regionMealAPI = await fetch(URL);
  return regionMealAPI.json();
}
