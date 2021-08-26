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
