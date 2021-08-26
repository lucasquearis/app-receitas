export const checkMealsInProgressRecipes = (id) => {
  if (localStorage.getItem('inProgressRecipes')) {
    const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    return Object.keys(meals).some((key) => key === id);
  }
};

export const checkDrinksInProgressRecipes = (id) => {
  if (localStorage.getItem('inProgressRecipes')) {
    const { cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    return Object.keys(cocktails).some((key) => key === id);
  }
};
