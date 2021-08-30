import { useEffect, useState } from 'react';

const INITIAL_STATE = {
  meals: {
    52771: [],
  },
  cocktails: {
    178319: [],
  },
};

const DoneRecipeHook = () => {
  const [doneRecipe, setDoneRecipe] = useState([]);
  const [inProgress, setInProgress] = useState(INITIAL_STATE);

  useEffect(() => {
    const localDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const localInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (localDone !== null) {
      setDoneRecipe(localDone);
    }
    if (localInProgress !== null) {
      setInProgress(localInProgress);
    }
  }, []);

  const handleBtnType = ({ id, feedType }) => {
    const cont = 'Continuar Receita';
    const init = 'Iniciar Receita';
    switch (feedType) {
    case 'comidas':
      if (inProgress.meals[id]) {
        return cont;
      }
      return init;
    case 'bebidas':
      if (inProgress.cocktails[id]) {
        return cont;
      }
      return init;
    default:
      break;
    }
  };

  const handleStart = ({ feedType, id }) => {
    if (!doneRecipe.some((e) => e[feedType] === id)) {
      const done = [...doneRecipe, { [feedType]: id }];
      setDoneRecipe(done);
      localStorage.setItem('inProgress', JSON.stringify(done));
    }
  };

  return { handleStart, doneRecipe, inProgress, handleBtnType };
};

export default DoneRecipeHook;
