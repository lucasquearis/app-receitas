const FOODS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const fetchFoods = async () => {
  try {
    const response = await fetch(FOODS_URL);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinks = async () => {
  try {
    const response = await fetch(DRINKS_URL);
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
  }
};
