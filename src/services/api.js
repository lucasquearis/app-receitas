const filterAlertMsg = 'Sua busca deve conter somente 1 (um) caracter';
let url;

const currentPage = window.location.href;
const foodPage = 'http://localhost:3000/comidas';
const cocktailPage = 'http://localhost:3000/bebidas';

if (currentPage === foodPage) {
  url = 'themealdb';
} else if (currentPage === cocktailPage) {
  url = 'thecocktaildb';
}

const ingredientURL = `https://www.${url}.com/api/json/v1/1/filter.php?i=`;
const nameURL = `https://www.${url}.com/api/json/v1/1/search.php?s=`;
const firstLetterURL = `https://www.${url}.com/api/json/v1/1/search.php?f=`;
const detailsURL = `https://www.${url}.com/api/json/v1/1/lookup.php?i=`;

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

export const getDataDetails = async (id) => {
  const response = await fetch(`${detailsURL}${id}`);
  if (currentPage === foodPage) {
    const { meals } = await response.json();
    return meals;
  }
  const { drinks } = await response.json();
  return drinks;
};
