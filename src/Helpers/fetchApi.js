const urlMeal = 'https://www.themealdb.com/api/json/v1/1/';
const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/';

const list = 'list.php?c=list';
const search = 'search.php?s=';

export const fetchApi = async (url, type, searchInput = '') => {
  const request = await fetch(`${url}${type}${searchInput}`);
  const response = await request.json();
  return response;
};

export const fetchApiCategory = async () => {
  const responseMeal = await fetchApi(urlMeal, list);
  const responseDrink = await fetchApi(urlDrink, list);
  return { ...responseMeal, ...responseDrink };
};

export const fetchApiRecipes = async () => {
  const responseMeal = await fetchApi(urlMeal, search);
  const responseDrink = await fetchApi(urlDrink, search);
  return { ...responseMeal, ...responseDrink };
};
