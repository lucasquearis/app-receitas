const getMealByID = async (ID) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`;
  const { meals } = await fetch(endpoint).then((data) => data.json());
  return (meals[0]);
};

export default getMealByID;
