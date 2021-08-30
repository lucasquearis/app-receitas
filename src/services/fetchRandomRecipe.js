export default async function fetchRandomRecipe(type) {
  let bodyURL = null;
  let key = null;
  if (type === '/comidas') { bodyURL = 'themealdb'; key = 'meals'; }
  if (type === '/bebidas') { bodyURL = 'thecocktaildb'; key = 'drinks'; }
  const res = await fetch(`https://www.${bodyURL}.com/api/json/v1/1/random.php`);
  const { [key]: results } = await res.json();
  return results[0];
}
