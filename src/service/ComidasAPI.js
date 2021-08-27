export async function buscarCategorias() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarComidaNome(nome) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarComidasIngrediente(ingr) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingr}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}

export async function buscarComidasLetra(letra) {
  const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letra}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.meals;
}
