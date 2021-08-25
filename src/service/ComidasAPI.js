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
