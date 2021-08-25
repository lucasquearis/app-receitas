const FOOD_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOOD_CATEGORIES_API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const FOODS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const FOOD_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export async function fetchFoods() {
  const fetchURL = await fetch(FOOD_API_URL);
  return fetchURL.json();
}

export async function fetchFoodCategories() {
  const fetchURL = await fetch(FOOD_CATEGORIES_API_URL);
  return fetchURL.json();
}

export async function fetchFoodByCategoryName(categoryName) {
  const fetchURL = await fetch(`${FOODS_BY_CATEGORY}${categoryName}`);
  return fetchURL.json();
}

export async function fetchFoodById(id) {
  const fetchURL = await fetch(`${FOOD_BY_ID}${id}`);
  const data = await fetchURL.json();
  return data;
}
