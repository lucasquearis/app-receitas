import { useState } from 'react';

const SITE = 'www.thecocktaildb.com';
const API = `${SITE}/api/json/v1/1`;
// const IMG = `${SITE}/images`;

function useDrinks() {
  const [drinks, setDrinks] = useState({ drinks: [] });

  function request(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setDrinks(data))
      .catch(console.error);
  }

  function searchDrinks(category, query) {
    request(`${API}/search.php?${category}=${query}`);
  }

  function searchByNameDrinks(query) {
    searchDrinks('s', query);
  }

  function searchByFirstDrinks(query) {
    searchDrinks('f', query);
  }

  function searchByIngredientDrinks(query) {
    searchDrinks('i', query);
  }

  const functions = {
    searchByNameDrinks,
    searchByFirstDrinks,
    searchByIngredientDrinks,
  };

  return [drinks, functions];
}

export default useDrinks;
