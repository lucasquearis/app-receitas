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
