export async function buscarTodasBebidasPorLetra(letra) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.drinks;
}

export async function buscarBebidaPorNome(nome) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.drinks;
}

export async function buscarCategorias() {
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.drinks;
}

export async function buscarBebidasPorCategoria(categoria) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoria}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.drinks;
}

export async function buscarBebidasIngrediente(ingr) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingr}`;
  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.drinks;
}

export async function buscarBebidaAleatoria() {
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const response = fetch(ENDPOINT).then((data) => data.json());
  return response;
}

export async function buscarBebidaPeloID(id) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const response = fetch(ENDPOINT).then((data) => data.json());
  return response;
}
