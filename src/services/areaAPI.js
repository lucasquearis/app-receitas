export async function fetchArea() {
  const areaAPI = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  return areaAPI.json();
}