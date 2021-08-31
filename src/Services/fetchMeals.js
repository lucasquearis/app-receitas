export async function fetchMeals() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const { meals } = await fetch(ENDPOINT).then((response) => response.json());
  return meals;
}

export async function fetchMealsCategories() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const { meals } = await fetch(ENDPOINT).then((response) => response.json());
  return meals;
}

export async function fetchMealsCategory(category) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const { meals } = await fetch(ENDPOINT).then((response) => response.json());
  return meals;
}
