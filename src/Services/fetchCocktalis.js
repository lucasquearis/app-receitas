const getCocktailByID = async (ID) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}`;
  const { drinks } = await fetch(endpoint).then((data) => data.json());
  return (drinks[0]);
};

export default getCocktailByID;
