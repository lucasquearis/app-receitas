const checkDoneRecipes = (id) => {
  if (localStorage.getItem('doneRecipes')) {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    return doneRecipes.some((element) => element.id === id);
  }
};

export default checkDoneRecipes;
