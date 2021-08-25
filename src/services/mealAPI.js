const InitialFood = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const InicialFoodCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const FoodByCategorie = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

export async function fetchInicialFoods() {
  const fetchURL = await fetch(InitialFood);
  return fetchURL.json();
}

export async function fetchFoodCategories() {
  const fetchURL = await fetch(InicialFoodCategories);
  return fetchURL.json();
}

export async function fetchFoodByCategorie(categorie) {
  const fetchURL = await fetch(`${FoodByCategorie}${categorie}`);
  return fetchURL.json();
}
