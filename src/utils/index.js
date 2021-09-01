// Regex source: https://gist.github.com/dreamstarter/9231254
export const validateLogin = (email, password) => {
  const regex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
  const NUMBER_SIX = 6;
  if (email.match(regex) && password.length > NUMBER_SIX) return true;
  return false;
};

export const saveLoginLocalStorage = (email) => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  localStorage.setItem('user', JSON.stringify({ email }));
};

export const getLocalStorage = (key) => {
  const storage = JSON.parse(localStorage.getItem(key));
  if (storage) return storage;
  if (key === 'user') return { email: '' };
  if (key === 'inProgressRecipes') return { cocktails: {}, meals: {} };
  return [];
};

export const createIngredients = (response, max) => {
  const newIngredients = [];
  for (let index = 1; index <= max; index += 1) {
    const name = response[0][`strIngredient${index}`];
    const measure = response[0][`strMeasure${index}`];
    if (name) {
      const ingredient = {
        name,
        measure,
        done: false,
      };
      newIngredients.push(ingredient);
    }
  }
  return newIngredients;
};

export const createDecorations = (ingredients) => (ingredients.map((ingredient) => {
  if (ingredient.done) {
    return ({ textDecoration: 'line-through' });
  }
  return {};
}));

export const handleDisabled = (ingredients) => !ingredients
  .every((ingredient) => ingredient.done);
