const filterAlertMsg = 'Sua busca deve conter somente 1 (um) caracter';
let url;

const currentPage = window.location.href;

if (currentPage.includes('comidas')) {
  url = 'themealdb';
} else if (currentPage.includes('bebidas')) {
  url = 'thecocktaildb';
}

const ingredientURL = `https://www.${url}.com/api/json/v1/1/filter.php?i=`;
const nameURL = `https://www.${url}.com/api/json/v1/1/search.php?s=`;
const firstLetterURL = `https://www.${url}.com/api/json/v1/1/search.php?f=`;
const categoryFilterURL = `https://www.${url}.com/api/json/v1/1/filter.php?c=`;

export const getDataByIngredient = async (ingredient) => {
  const response = await fetch(`${ingredientURL}${ingredient}`);
  const data = response.json();

  return data;
};

export const getDataByName = async (name) => {
  const response = await fetch(`${nameURL}${name}`);
  const data = response.json();

  return data;
};

export const getDataByFirstLetter = async (letter) => {
  const response = await fetch(`${firstLetterURL}${letter}`);
  const data = response.json();
  if (letter.length >= 2) {
    // eslint-disable-next-line no-alert
    alert(filterAlertMsg);
    return data;
  }

  return data;
};

export const getDataByCategory = async (category) => {
  const response = await fetch(`${categoryFilterURL}${category}`);
  const data = await response.json();

  return data;
};
