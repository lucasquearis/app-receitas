export async function buscarBebidaNome(nome) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.drinks;
}

export async function buscarBebidasIngrediente(ingr) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingr}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.drinks;
}

export async function buscarBebidasLetra(letra) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.drinks;
}
