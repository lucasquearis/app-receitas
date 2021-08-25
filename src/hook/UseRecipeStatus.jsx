import { useSelector } from 'react-redux';

function UseRecipeStatus(recipe, type) {
  const doneRecipes = useSelector((state) => state.doneRecipes);
  const recipeIsDone = doneRecipes.some((done) => recipe[`id${type}`] === done.id);

  const progressRecipes = useSelector((state) => state.inProgressRecipes);
  const progressKey = (type === 'Meal') ? 'meals' : 'cocktails';
  const allIds = Object.keys(progressRecipes[progressKey]);
  const recipeInProgress = allIds.some((recipeId) => recipe[`id${type}`] === recipeId);

  return { recipeIsDone, recipeInProgress };
}

export default UseRecipeStatus;
