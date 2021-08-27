export default async function fetchAPIByAreas(area) {
  try {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    const response = await fetch(URL);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
  }
}
