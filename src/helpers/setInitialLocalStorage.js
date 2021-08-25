const setInitialLocalStorage = (user) => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  localStorage.setItem(
    'inProgressRecipes',
    JSON.stringify({ cocktails: {}, meals: {} }),
  );
  localStorage.setItem('user', JSON.stringify(user));
};

export default setInitialLocalStorage;
