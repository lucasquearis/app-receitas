export default async function fetchRandomMeal() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const result = await res.json();
  return (result.meals)[0];
}
