export function getMealById(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((result) => result.json())
    .then((resolve) => resolve);
}

export function getDrinkById(id) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((result) => result.json())
    .then((resolve) => resolve);
}
