const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default async function () {
  try {
    const response = await fetch(urlMeals);
    const resolve = await response.json();
    return resolve.meals;
  } catch (error) {
    return console.log(error);
  }
}
