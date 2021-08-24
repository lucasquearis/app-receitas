const fetchRecipes = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const { results } = json;
    return results;
  } catch (error) {
    return error;
  }
};

export default fetchRecipes;
