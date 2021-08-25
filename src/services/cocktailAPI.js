const COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const COCKTAIL_CATEGORIES_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINK_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const DRINK_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export async function fetchCocktails() {
  const fetchURL = await fetch(COCKTAIL_API_URL);
  return fetchURL.json();
}

export async function fetchCocktailCategories() {
  const fetchURL = await fetch(COCKTAIL_CATEGORIES_API_URL);
  return fetchURL.json();
}

export async function fetchDrinkByCategoryName(categoryName) {
  const fetchURL = await fetch(`${DRINK_BY_CATEGORY}${categoryName}`);
  return fetchURL.json();
}

export async function fetchDrinkById(id) {
  const fetchURL = await fetch(`${DRINK_BY_ID}${id}`);
  const data = await fetchURL.json();
  return data;
}
