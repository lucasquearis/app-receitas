const COCKTAIL_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const COCKTAIL_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const COCKTAIL_BY_FIRST_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const COCKTAIL_CATEGORIES_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINK_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const DRINK_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const RANDOM_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

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

export async function fetchDrinkByIngredient(ingredient) {
  const fetchURL = await fetch(`${COCKTAIL_BY_INGREDIENT}${ingredient}`);
  const data = await fetchURL.json();
  return data;
}

export async function fetchCocktailByFilters(filters) {
  const { inputSearch, ingredient, name, firstLetter } = filters;
  let response = [];
  if (ingredient) {
    const fetchURL = await fetch(COCKTAIL_BY_INGREDIENT + inputSearch);
    const { drinks } = await fetchURL.json();
    response = drinks;
  }
  if (name) {
    const fetchURL = await fetch(COCKTAIL_API_URL + inputSearch);
    const { drinks } = await fetchURL.json();
    response = drinks;
  }
  if (firstLetter) {
    if (inputSearch.length > 1) {
      response = global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const fetchURL = await fetch(COCKTAIL_BY_FIRST_LETTER + inputSearch);
    const { drinks } = await fetchURL.json();
    response = drinks;
  }
  return response;
}

export async function fetchRandomDrink() {
  const fetchURL = await fetch(RANDOM_DRINK);
  return fetchURL.json();
}
