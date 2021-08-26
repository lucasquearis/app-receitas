export const fetchRecipes = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const { results } = json;
    return results;
  } catch (error) {
    return error;
  }
};

export const fetchRecipesMeals = async (url) => {
  try {
    const request = await fetch(url);
    const { meals } = await request.json();
    return meals;
  } catch (error) {
    return console.log(error);
  }
};

export const fetchRecipesDrinks = async (url) => {
  try {
    const request = await fetch(url);
    const { drinks } = await request.json();
    return drinks;
  } catch (error) {
    return console.log(error);
  }
};
