export function addMealIngInProgressStorage(id, ing) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { meals } = inProgressRecipes;

  if (Object.keys(meals).some((k) => k === id)) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      meals: { ...meals, [id]: [...meals[id], ing] },
    }));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      meals: { ...meals, [id]: [ing] },
    }));
  }
}

export function rmvMealIngInProgressStorage(id, ing) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { meals } = inProgressRecipes;

  if (meals[id].length <= 1) {
    const newMeals = { ...meals };
    delete (newMeals[id]);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      meals: { ...newMeals },
    }));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      meals: { ...meals, [id]: meals[id].filter((e) => e !== ing) },
    }));
  }
}
