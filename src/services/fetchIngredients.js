export default async function fetchIngredients(type) {
  let bodyURL = null;
  if (type === 'comidas') bodyURL = 'themealdb';
  if (type === 'bebidas') bodyURL = 'thecocktaildb';

  const res = await fetch(`https://www.${bodyURL}.com/api/json/v1/1/list.php?i=list`);
  const result = await res.json();
  return result;
}
