const fetchArea = async (area) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const { meals } = await fetch(url).then((dados) => dados.json());
  return meals;
};

export default fetchArea;
