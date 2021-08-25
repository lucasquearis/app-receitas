const FOOD_INGREDIENT_SEARCH_API = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FOOD_NAME_SEARCH_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const FOOD_FIRST_LETTER_SEARCH_API = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const DRINK_INGREDIENT_SEARCH_API = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const DRINK_NAME_SEARCH_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const DRINK_FIRST_LETTER_SEARCH_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export const fetchSearchFoodsApi = async (consultBy, query) => {
  const checkConsultBy = consultBy === 'ingredient'
    ? FOOD_INGREDIENT_SEARCH_API
    : FOOD_NAME_SEARCH_API;
  const endPoint = consultBy === 'first-letter'
    ? FOOD_FIRST_LETTER_SEARCH_API
    : checkConsultBy;
  try {
    const response = await fetch(`${endPoint}${query}`);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSearchDrinksApi = async (consultBy, query) => {
  const checkConsultBy = consultBy === 'ingredient'
    ? DRINK_INGREDIENT_SEARCH_API
    : DRINK_NAME_SEARCH_API;

  const endPoint = consultBy === 'first-letter'
    ? DRINK_FIRST_LETTER_SEARCH_API
    : checkConsultBy;

  try {
    const response = await fetch(`${endPoint}${query}`);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};
