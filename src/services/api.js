const filterAlertMsg = 'Sua busca deve conter somente 1 (um) caracter';

const getUrl = () => {
  const currentPage = window.location.href;
  let url;

  if (currentPage.includes('comidas')) {
    url = 'themealdb';
  } else if (currentPage.includes('bebidas')) {
    url = 'thecocktaildb';
  }

  const ingredientURL = `https://www.${url}.com/api/json/v1/1/filter.php?i=`;
  const nameURL = `https://www.${url}.com/api/json/v1/1/search.php?s=`;
  const firstLetterURL = `https://www.${url}.com/api/json/v1/1/search.php?f=`;
  const categoryFilterURL = `https://www.${url}.com/api/json/v1/1/filter.php?c=`;
  const areaURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

  return {
    ingredientURL,
    nameURL,
    firstLetterURL,
    categoryFilterURL,
    areaURL,
  };
};

export const getDataByIngredient = async (ingredient) => {
  const { ingredientURL } = getUrl();
  const response = await fetch(`${ingredientURL}${ingredient}`);
  const data = response.json();

  return data;
};

export const getDataByName = async (name) => {
  const { nameURL } = getUrl();
  const response = await fetch(`${nameURL}${name}`);
  const data = response.json();

  return data;
};

export const getDataByFirstLetter = async (letter) => {
  const { firstLetterURL } = getUrl();
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
  const { categoryFilterURL } = getUrl();
  const response = await fetch(`${categoryFilterURL}${category}`);
  const data = await response.json();

  return data;
};

export const getDataByArea = async (area) => {
  const { areaURL } = getUrl();
  const response = await fetch(`${areaURL}${area}`);
  const data = await response.json();

  return data;
};
