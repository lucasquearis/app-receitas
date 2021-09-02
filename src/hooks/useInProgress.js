import { useCallback, useEffect, useState } from 'react';

const useInProgress = (type, details) => {
  const [recipe, setRecipe] = useState([]);
  const aux = type === 'comidas' ? 'meals' : 'cocktails';

  const getRecipes = useCallback(() => {
    if (details) {
      const localRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const picked = localRecipes && localRecipes[aux]
        && localRecipes[aux][details[`id${details.prefix}`]]
        ? localRecipes[aux][details[`id${details.prefix}`]] : [];
      setRecipe(picked);
    }
  }, [details, aux]);

  useEffect(() => {
    if (details && recipe.length > 0) {
      let localRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (localRecipes !== null) {
        localRecipes = {
          ...localRecipes,
          [aux]: { ...localRecipes[aux], [details[`id${details.prefix}`]]: [...recipe] },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(localRecipes));
        return;
      }
      localRecipes = { [aux]: { [details[`id${details.prefix}`]]: [...recipe] } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(localRecipes));
    }
  }, [recipe, details, aux]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  const setToLocal = (ingredient) => {
    if (recipe.some((e) => e === ingredient)) {
      setRecipe(recipe.filter((e) => e !== ingredient));
      return;
    }
    setRecipe([...recipe, ingredient]);
  };

  return {
    recipe,
    setToLocal,
  };
};

export default useInProgress;
