const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export default async function fetchAPI() {
  try {
    const response = await fetch(urlDrinks);
    const resolve = await response.json();
    return resolve.drinks;
  } catch (error) {
    return console.log(error);
  }
}
