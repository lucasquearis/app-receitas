const urlFoodList = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlFoodCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const urlFoodListByCategory = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const urlFoodRandom = 'https://www.themealdb.com/api/json/v1/1/random.php';
const urlFoodIngredientsList = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const urlFoodFilterByIngredientList = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const urlFoodPerAreaList = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const urlFoodPerAreaFilter = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

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

export async function fetchAPIListByCategory(category) {
  try {
    const response = await fetch(`${urlFoodListByCategory}${category}`);
    const resolve = await response.json();
    return resolve.meals;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchFoodRandom() {
  try {
    const response = await fetch(urlFoodRandom);
    const resolve = await response.json();
    return resolve.meals;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchFoodIngredientsList() {
  try {
    const response = await fetch(urlFoodIngredientsList);
    const resolve = await response.json();
    return resolve.meals;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchFoodFilterByIngredientList(title) {
  try {
    const response = await fetch(`${urlFoodFilterByIngredientList}${title}`);
    const resolve = await response.json();
    return resolve.meals;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchFoodPerAreaList() {
  try {
    const response = await fetch(urlFoodPerAreaList);
    const resolve = await response.json();
    return resolve.meals;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchFoodPerAreaFilter(area) {
  try {
    const response = await fetch(`${urlFoodPerAreaFilter}${area}`);
    const resolve = await response.json();
    return resolve.meals;
  } catch (error) {
    console.log(error);
  }
}
