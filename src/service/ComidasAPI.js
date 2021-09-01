export async function buscarCategorias() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response;
}

export async function buscarComidaPeloID(id) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarComidasAleatoria() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarAleatoria() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/random.php';

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarIngrediente() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}
