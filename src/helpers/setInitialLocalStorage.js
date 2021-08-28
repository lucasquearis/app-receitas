const setInitialLocalStorage = (user) => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  if (user.length) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }),
    );
  }
  if (!localStorage.doneRecipes) {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([]),
    );
  }
  if (!localStorage.favoriteRecipes) {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([]),
    );
  }
};

export default setInitialLocalStorage;
