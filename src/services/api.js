const mealIngredientURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const mealNameURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s';
const mealFirstLetterURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f';

const alertMsg = 'Sua busca deve conter somente 1 (um) caracter';

export const getMealsByIngredients = async (ingredient) => {
  const response = await fetch(`${mealIngredientURL}${ingredient}`);
  const data = response.json();

  return data;
};

export const getMealsByName = async (name) => {
  const response = await fetch(`${mealNameURL}=${name}`);
  const data = response.json();

  return data;
};

export const getMealsByFirstLetter = async (letter) => {
  const response = await fetch(`${mealFirstLetterURL}=${letter}`);
  const data = response.json();
  if (letter.length >= 2) {
    return alert(alertMsg);
  }

  return data;
};
