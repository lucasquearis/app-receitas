export const fetchDrinksByIngredient = (ingredient) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks);
};

export const fetchDrinksByName = (name) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks);
};

export const fetchDrinksByFirstLetter = (firstLetter) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => data.drinks);
};
