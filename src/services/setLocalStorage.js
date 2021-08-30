function setLocalStorage() {
  const done = [{
    id: '',
    type: '',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: '',
  }];
  const doneRecipesStorage = JSON.stringify(done);
  localStorage.setItem('doneRecipes', doneRecipesStorage);

  const favorite = [{
    id: '',
    type: '',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
  }];

  const favoriteRecipesStorage = JSON.stringify(favorite);
  localStorage.setItem('favoriteRecipes', favoriteRecipesStorage);

  const inProgress = {
    cocktails: {
    },
    meals: {
    },
  };

  const inProgressStorage = JSON.stringify(inProgress);
  localStorage.setItem('inProgressRecipes', inProgressStorage);
}

export default setLocalStorage;
