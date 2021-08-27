import { useSelector } from 'react-redux';

function UseRecipeStatus(recipe, type) {
  const progressRecipes = useSelector((state) => state.inProgressRecipes);
  const progressKey = (type === 'Meal') ? 'meals' : 'cocktails';
  const allIds = Object.keys(progressRecipes[progressKey]);
  const recipeInProgress = allIds.some((recipeId) => recipe[`id${type}`] === recipeId);

  return { recipeInProgress };
}

export default UseRecipeStatus;
