const getDetails = async (api) => {
  const endpoint = api;
  const response = await fetch(endpoint);
  if (!response.ok) return console.log('Falha na requisição de detalhes');
  const result = response.json();
  return result;
};

export default getDetails;
