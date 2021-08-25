const setInitialLocalStorage = (user) => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  localStorage.setItem('user', JSON.stringify(user));
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }),
    );
  }
};

export default setInitialLocalStorage;
