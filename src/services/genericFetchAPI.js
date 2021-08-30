export default function genericFetchAPI(mealOrCocktail, type, start, search) {
  return fetch(`https://www.the${mealOrCocktail}db.com/api/json/v1/1/${type}.php?${start}=${search}`)
    .then((response) => response.json())
    .then((data) => data);
}
