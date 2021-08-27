const initialStorage = (id, callback, ingredients, type) => {
  if (localStorage.inProgressRecipes) {
    const { recipes } = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    let arraySteps = [];
    const recipe = recipes.find((r) => Object.keys(r)[0] === id);
    const steps = ingredients.map((ing) => {
      if (recipe) {
        const isChecked = recipe.steps.find(({ step }) => step === ing[1]);
        arraySteps = [...arraySteps, { step: ing[1], checked: isChecked }];
        return ([{
          ...recipes,
          [type]: [{
            [id]: arraySteps,
          }],
        }]);
      }
      arraySteps = [...arraySteps, { step: ing[1], checked: false }];
      return ([{
        ...recipes,
        [type]: [{
          [id]: arraySteps,
        }],
      }]);
    });
    callback(steps);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      [type]: [...[type], [{ [id]: steps }]],
    }));
    return;
  }
  const steps = ingredients.map((ing) => ([{ step: ing[1], checked: false }]));
  callback(steps);

  if (type === 'meals') {
    localStorage.setItem('inProgressRecipes', JSON.stringify([{
      [type]: [{
        [id]: steps,
      }],
      drinks: [],
    }]));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify([{
      [type]: [{
        [id]: steps,
      }],
      meals: [],
    }]));
  }
};

export default initialStorage;
