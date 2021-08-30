const exploreArea = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint);
  if (!response.ok) return console.log('Falha na requisição');
  const result = await response.json();
  return result;
};

export default exploreArea;
