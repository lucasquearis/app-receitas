export default async function fetchAPIAreas() {
  try {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(URL);
    const { meals } = await response.json();
    const areas = meals.map(({ strArea }) => strArea);
    return areas;
  } catch (error) {
    console.log(error);
  }
}
