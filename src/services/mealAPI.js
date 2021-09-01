const FOOD_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FOOD_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOOD_BY_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const FOOD_CATEGORIES_API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const FOODS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const FOOD_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const RANDOM_MEAL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const FOOD_AREA = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const FOOD_FILTER_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

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

export async function fetchFoodByIngredient(ingredient) {
  const fetchURL = await fetch(`${FOOD_BY_INGREDIENT}${ingredient}`);
  const data = await fetchURL.json();
  return data;
}

export async function fetchFoodByFilters(filters) {
  const { inputSearch, ingredient, name, firstLetter } = filters;
  let response = [];
  if (ingredient) {
    const fetchURL = await fetch(FOOD_BY_INGREDIENT + inputSearch);
    const { meals } = await fetchURL.json();
    response = meals;
  }
  if (name) {
    const fetchURL = await fetch(FOOD_API_URL + inputSearch);
    const { meals } = await fetchURL.json();
    response = meals;
  }
  if (firstLetter) {
    if (inputSearch.length > 1) {
      response = global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const fetchURL = await fetch(FOOD_BY_FIRST_LETTER + inputSearch);
    const { meals } = await fetchURL.json();
    response = meals;
  }
  return response;
}

export async function fetchRandomMeal() {
  const fetchURL = await fetch(RANDOM_MEAL);
  return fetchURL.json();
}

export async function fetchByArea() {
  const fetchURL = await fetch(FOOD_AREA);
  return fetchURL.json();
}

export async function fetchFilterByArea(area) {
  const fetchURL = await fetch(`${FOOD_FILTER_AREA}${area}`);
  return fetchURL.json();
}
