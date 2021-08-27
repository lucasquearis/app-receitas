export const inProgessStorage = (id, callback, ingredients, type) => {
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
      [type]: {
        [id]: steps,
      },
      drinks: [],
    }]));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify([{
      [type]: {
        [id]: steps,
      },
      meals: [],
    }]));
  }
};

export const favoriteRecipes = (props, btnFavorite) => {
  const { drink, meals, thumb, category, alcoholic, id, area, type } = props;
  const recipes = [{
    id,
    type,
    area,
    category,
    alcoholicOrNot: alcoholic,
    name: (type === 'bebida') ? (drink) : (meals),
    image: thumb,
  }];
  const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (localStorage.favoriteRecipes && recipesFavorite.length > 0) {
    if (recipesFavorite.some((item) => item.id !== id)) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...recipesFavorite, ...recipes]));
    }
    if (btnFavorite && recipesFavorite.some((item) => item.id === id)) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...recipesFavorite.filter((item) => item.id !== id)]));
    }
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
  }
};

export const startOrContinue = (callback, id, type) => {
  const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (localStorage.inProgressRecipes) {
    console.log(type);
    console.log(data);

    if (type === 'drinks') {
      const { cocktails } = data[0];
      callback(+Object.keys(cocktails) === id);
    } else {
      const { meals } = data[0];
      callback(+Object.keys(meals) === id);
    }
  }
};
