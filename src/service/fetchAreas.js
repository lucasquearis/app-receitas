const fetchArea = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const { meals } = await fetch(url).then((dados) => dados.json());
  return meals;
};

export default fetchArea;
