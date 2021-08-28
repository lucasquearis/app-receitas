export default function genericFetchAPI(mealOrCocktail, type, start, search) {
  return fetch(`https://www.the${mealOrCocktail}db.com/api/json/api/json/v1/1/${type}.php?${start}=${search}`)
    .then((response) => response.json())
    .then((data) => data);
}

export function getMealById(id) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((result) => result.json())
    .then((resolve) => resolve.meals[0]);
}

export function getDrinkById(id) {
  return fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((result) => result.json())
    .then((resolve) => resolve.drinks[0]);
}

export function getRecomendationsMeals() {
  return fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((result) => result.json())
    .then((resolve) => resolve.meals);
}

export function getRecomendationsDrinks() {
  return fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((result) => result.json())
    .then((resolve) => resolve);
}
