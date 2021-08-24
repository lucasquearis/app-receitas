async function buscarCategorias() {
  const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  const response = await fetch(ENDPOINT).then((data) => data.json());
  return response;
}

export default buscarCategorias;
