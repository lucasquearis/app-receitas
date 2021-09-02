export function initialInProgressStorage() {
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    cocktails: {},
    meals: {},
  }));
}

export function updateInProgressStorage(type, id, stepId) {
  const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipes = storage[type];
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    ...storage,
    [type]: { ...recipes, [id]: stepId },
  }));
}
