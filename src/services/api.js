const filterAlertMsg = 'Sua busca deve conter somente 1 (um) caracter';

const getUrl = () => {
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
  const categoryFilterURL = `https://www.${url}.com/api/json/v1/1/filter.php?c=`;
  const areaURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
  const detailsURL = `https://www.${url}.com/api/json/v1/1/lookup.php?i=`;
  const recomendationsURL = `https://www.${url}.com/api/json/v1/1/search.php?s=`;

  return {
    ingredientURL,
    nameURL,
    firstLetterURL,
    categoryFilterURL,
    areaURL,
    detailsURL,
    recomendationsURL,
  };
};

export const getRecomendations = async () => {
  const { recomendationsURL, currentPage, foodPage, cocktailPage } = getUrl();

  const response = await fetch(recomendationsURL);
  if (currentPage.includes(foodPage)) {
    const { drinks } = await response.json();

    return drinks;
  } if (currentPage.includes(cocktailPage)) {
    const { meals } = await response.json();

    return meals;
  }
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

export const getDataDetails = async (id) => {
  const { detailsURL, currentPage, foodPage } = getUrl();
  const response = await fetch(`${detailsURL}${id}`);
  if (currentPage.includes(foodPage)) {
    const { meals } = await response.json();
    return meals[0];
  }
  const { drinks } = await response.json();
  return drinks[0];
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
