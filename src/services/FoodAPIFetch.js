const urlFoodList = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlFoodCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export async function fetchAPIList() {
  try {
    const response = await fetch(urlFoodList);
    const resolve = await response.json();
    return resolve.meals;
  } catch (error) {
    return console.log(error);
  }
}

export async function fetchAPICategories() {
  try {
    const response = await fetch(urlFoodCategories);
    const resolve = await response.json();
    return resolve.meals;
  } catch (error) {
    return console.log(error);
  }
}
