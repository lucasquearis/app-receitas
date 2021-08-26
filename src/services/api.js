const filterAlertMsg = 'Sua busca deve conter somente 1 (um) caracter';
let url;
const mealURL = 'themealdb';
const drinkURL = 'thecocktaildb';

const currentPage = window.location.href;
const foodPage = 'comidas';
const cocktailPage = 'bebidas';

if (currentPage.includes(foodPage)) {
  url = mealURL;
} else if (currentPage.includes(cocktailPage)) {
  url = drinkURL;
}

const ingredientURL = `https://www.${url}.com/api/json/v1/1/filter.php?i=`;
const nameURL = `https://www.${url}.com/api/json/v1/1/search.php?s=`;
const firstLetterURL = `https://www.${url}.com/api/json/v1/1/search.php?f=`;
const detailsURL = `https://www.${url}.com/api/json/v1/1/lookup.php?i=`;

export const getRecomendations = async () => {
  if (currentPage.includes(foodPage)) {
    url = drinkURL;
  } else if (currentPage.includes(cocktailPage)) {
    url = mealURL;
  }
  const recomendationsURL = `https://www.${url}.com/api/json/v1/1/search.php?s=`;
  const response = await fetch(`${recomendationsURL}`);
  if (currentPage.includes(foodPage)) {
    const { drinks } = await response.json();

    return drinks;
  } if (currentPage.includes(cocktailPage)) {
    const { meals } = await response.json();

    return meals;
  }
};

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
  if (currentPage.includes(foodPage)) {
    const { meals } = await response.json();
    return meals[0];
  }
  const { drinks } = await response.json();
  return drinks[0];
};
