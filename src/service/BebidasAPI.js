export default async function buscarBebidaAleatoria() {
  const ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  const response = fetch(ENDPOINT).then((data) => data.json());
  return response;
}
