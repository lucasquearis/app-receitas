const DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINKS_API_URL_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const DRINKS_API_URL_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

const INGREDIENTS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

export const fetchDrinksApi = async (drinkFilter = { searchText: '', search: '' }) => {
  const { searchText, search } = drinkFilter;

  if (search === '') {
    const response = await fetch(DRINKS_API_URL);
    return response.json();
  }
  if (search === 'Nome') {
    const response = await fetch(`${DRINKS_API_URL}${searchText}`);
    return response.json();
  }
  if (search === 'Primeira letra') {
    const response = await fetch(`${DRINKS_API_URL_LETTER}${searchText}`);
    return response.json();
  }
  if (search === 'Ingrediente') {
    const response = await fetch(`${DRINKS_API_URL_INGREDIENT}${searchText}`);
    return response.json();
  }
};

const CATEGORIES_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const DRINKS_BY_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export const fetchCategoriesDrinksApi = async () => {
  const response = await fetch(CATEGORIES_API_URL);
  return response.json();
};

export const fetchDrinksByCategoryName = async (categoryName) => {
  const response = await fetch(`${DRINKS_BY_CATEGORY}${categoryName}`);
  return response.json();
};

export const fetchIngredients = async () => {
  const response = await fetch(INGREDIENTS_URL);
  return response.json();
};
