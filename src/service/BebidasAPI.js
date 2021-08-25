export default async function buscarTodasBebidasPorLetra(letra) {
  const ENDPOINT = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letra}`;

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response.drinks;
}
