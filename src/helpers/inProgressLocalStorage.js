export function addIngInProgressStorage(id, ing, type) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const typeToAdd = inProgressRecipes[type];

  if (Object.keys(typeToAdd).some((k) => k === id)) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: { ...typeToAdd, [id]: [...typeToAdd[id], ing] },
    }));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: { ...typeToAdd, [id]: [ing] },
    }));
  }
}

export function rmvIngFromProgressStorage(id, ing, type) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const typeToAdd = inProgressRecipes[type];

  if (typeToAdd[id].length <= 1) {
    const newMeals = { ...typeToAdd };
    delete (newMeals[id]);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: { ...newMeals },
    }));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: { ...typeToAdd, [id]: typeToAdd[id].filter((e) => e !== ing) },
    }));
  }
}
