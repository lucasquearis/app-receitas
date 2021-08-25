const DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const CATEGORIES_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINKS_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export const fetchDrinksApi = async () => {
  const response = await fetch(DRINKS_API_URL);
  return response.json();
};

export const fetchCategoriesDrinksApi = async () => {
  const response = await fetch(CATEGORIES_API_URL);
  return response.json();
};

export const fetchDrinksByCategoryName = async (categoryName) => {
  const response = await fetch(`${DRINKS_BY_CATEGORY}${categoryName}`);
  return response.json();
};
