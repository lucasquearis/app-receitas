export async function buscarCategorias() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarTodasComidasPorLetra(letra) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letra}`;
  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarComidaPeloID(id) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarComidaPorNome(nome) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarComidasAleatoria() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarComidasPorCategoria(categoria) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarComidasIngrediente(ingr) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`;
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

export async function buscarArea() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response;
}

export async function buscarComidasArea(area) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response;
}
