const getDrink = async (api) => {
  const endpoint = api;
  const response = await fetch(endpoint);
  if (!response.ok) return console.log('Falha na requisição de bebidas por ingrediente');
  const result = response.json();
  return result;
};

export default getDrink;
