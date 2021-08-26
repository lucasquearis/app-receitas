const setInitialLocalStorage = (user) => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('doneRecipes', JSON.stringify([]));
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: { 17256: ['1', '2'] }, meals: { 52772: ['1', '2'] } }),
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
