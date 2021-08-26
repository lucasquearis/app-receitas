export async function buscarCategorias() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response;
}

export async function buscarTodasComidasPorLetra(letra) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letra}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarComidaPorNome(nome) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  console.log(response);
  return response.meals;
}
