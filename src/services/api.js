const mealIngredientURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const mealNameURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const mealFirstLetterURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

const cocktailIngredientURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const cocktailNameURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const cocktailFirstLetterURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

const alertMsg = 'Sua busca deve conter somente 1 (um) caracter';

const currentPage = window.location.href;
const foodPage = 'http://localhost:3000/comidas';
const cocktailPage = 'http://localhost:3000/bebidas';

export const getDataByIngredient = async (ingredient) => {
  if (currentPage === foodPage) {
    const response = await fetch(`${mealIngredientURL}${ingredient}`);
    const data = response.json();

    return data;
  } if (currentPage === cocktailPage) {
    const response = await fetch(`${cocktailIngredientURL}${ingredient}`);
    const data = response.json();

    return data;
  }
};

export const getDataByName = async (name) => {
  if (currentPage === foodPage) {
    const response = await fetch(`${mealNameURL}${name}`);
    const data = response.json();

    return data;
  } if (currentPage === cocktailPage) {
    const response = await fetch(`${cocktailNameURL}${name}`);
    const data = response.json();

    return data;
  }
};

export const getDataByFirstLetter = async (letter) => {
  if (currentPage === foodPage) {
    const response = await fetch(`${mealFirstLetterURL}${letter}`);
    const data = response.json();
    if (letter.length >= 2) {
      // eslint-disable-next-line no-alert
      return alert(alertMsg);
    }

    return data;
  } if (currentPage === cocktailPage) {
    const response = await fetch(`${cocktailFirstLetterURL}${letter}`);
    const data = response.json();
    if (letter.length >= 2) {
      // eslint-disable-next-line no-alert
      return alert(alertMsg);
    }
    return data;
  }
};
