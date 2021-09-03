const getDetails = async (api) => {
  const response = await fetch(api);
  if (!response.ok) return console.log('Falha na requisição de detalhes');
  const result = await response.json();
  return result;
};

export default getDetails;
