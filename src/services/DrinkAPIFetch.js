const urlDrinkList = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const urlDrinkCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const urlDrinkListByCategory = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export async function fetchAPIList() {
  try {
    const response = await fetch(urlDrinkList);
    const resolve = await response.json();
    return resolve.drinks;
  } catch (error) {
    return console.log(error);
  }
}

export async function fetchAPICategories() {
  try {
    const response = await fetch(urlDrinkCategories);
    const resolve = await response.json();
    return resolve.drinks;
  } catch (error) {
    return console.log(error);
  }
}

export async function fetchAPIListByCategory(category) {
  try {
    const response = await fetch(`${urlDrinkListByCategory}${category}`);
    const resolve = await response.json();
    return resolve.drinks;
  } catch (error) {
    console.log(error);
  }
}
