import { useState } from 'react';

const SITE = 'www.themealdb.com';
const API = `${SITE}/api/json/v1/1`;
// const IMG = `${SITE}/images`;

function useFoods() {
  const [foods, setFoods] = useState({ foods: [] });

  function request(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setFoods(data))
      .catch(console.error);
  }

  function searchFoods(category, query) {
    request(`${API}/search.php?${category}=${query}`);
  }

  function searchByNameFoods(query) {
    searchFoods('s', query);
  }

  function searchByFirstFoods(query) {
    searchFoods('f', query);
  }

  const functions = {
    searchByNameFoods,
    searchByFirstFoods,
  };

  return [foods, functions];
}

export default useFoods;
