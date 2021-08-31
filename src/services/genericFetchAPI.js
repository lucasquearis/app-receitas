function genericFetchAPI(mealOrCocktail, type, inicio, search) {
  return fetch(`https://www.the${mealOrCocktail}db.com/api/json/v1/1/${type}.php?${inicio}=${search}`)
    .then((response) => response.json())
    .then((data) => data);
}

export default genericFetchAPI;
