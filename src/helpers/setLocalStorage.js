const initialStorage = (id, callback, ingredients) => {
  if (localStorage.recipeProgess) {
    const { recipes } = JSON
      .parse(localStorage.getItem('recipeProgess'));
    const recipe = recipes.find((r) => r.id === id);
    const steps = ingredients.map((ing) => {
      if (recipe) {
        const isChecked = recipe.steps.find(({ step }) => step === ing[1]);
        return ({
          step: ing[1],
          checked: isChecked.checked,
        });
      }
      return ({
        step: ing[1],
        checked: false,
      });
    });
    callback(steps);
    localStorage.setItem('recipeProgess', JSON.stringify({
      recipes: [...recipes, { id, steps }],
    }));
    return;
  }
  const steps = ingredients.map((ing) => ({ step: ing[1], checked: false }));
  callback(steps);
  localStorage.setItem('recipeProgess', JSON.stringify({
    recipes: [{
      id,
      steps,
    }],
  }));
};

export default initialStorage;
