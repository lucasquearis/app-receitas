const MEAL_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEAL_API_URL_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const MEAL_API_URL_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

const INGREDIENTS_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export const fetchMealApi = async (foodFilter = { searchText: '', search: '' }) => {
  const { searchText, search } = foodFilter;

  if (search === '') {
    const response = await fetch(MEAL_API_URL);
    return response.json();
  }
  if (search === 'Nome') {
    const response = await fetch(`${MEAL_API_URL}${searchText}`);
    return response.json();
  }
  if (search === 'Primeira letra') {
    const response = await fetch(`${MEAL_API_URL_LETTER}${searchText}`);
    return response.json();
  }
  if (search === 'Ingrediente') {
    const response = await fetch(`${MEAL_API_URL_INGREDIENT}${searchText}`);
    return response.json();
  }
};

const CATEGORIES_API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const MEALS_BY_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

export const fetchCategoriesMealApi = async () => {
  const response = await fetch(CATEGORIES_API_URL);
  return response.json();
};

export const fetchMealsByCategoryName = async (categoryName) => {
  const response = await fetch(`${MEALS_BY_CATEGORY}${categoryName}`);
  return response.json();
};

export const fetchIngredients = async () => {
  const response = await fetch(INGREDIENTS_URL);
  return response.json();
};
