const MEAL_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const CATEGORIES_API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const MEALS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

export const fetchMealApi = async () => {
  const response = await fetch(MEAL_API_URL);
  return response.json();
};

export const fetchCategoriesMealApi = async () => {
  const response = await fetch(CATEGORIES_API_URL);
  return response.json();
};

export const fetchMealsByCategoryName = async (categoryName) => {
  const response = await fetch(`${MEALS_BY_CATEGORY}${categoryName}`);
  return response.json();
};
