export async function fetchCocktails() {
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const { drinks } = await fetch(ENDPOINT).then((response) => response.json());
  return drinks;
}

export async function fetchCocktailsCategories() {
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const { drinks } = await fetch(ENDPOINT).then((response) => response.json());
  return drinks;
}

export async function fetchCocktailsCategory(category) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const { drinks } = await fetch(ENDPOINT).then((response) => response.json());
  return drinks;
}
