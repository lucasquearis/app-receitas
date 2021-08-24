const getFood = async (api) => {
  const endpoint = api;
  const response = await fetch(endpoint);
  if (!response.ok) return console.log('Falha na requisição de receitas por ingrediente');
  const result = response.json();
  return result;
};

export default getFood;
