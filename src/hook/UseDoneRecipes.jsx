import { useState } from 'react';
import { useSelector } from 'react-redux';

function UseDoneRecipes() {
  const doneRecipes = useSelector((state) => state.doneRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  const resetFilter = () => setFilteredRecipes(doneRecipes);

  const foodFilter = () => {
    const foodRecipes = doneRecipes.filter((recipe) => recipe.type === 'comida');
    setFilteredRecipes(foodRecipes);
  };

  const drinksFilter = () => {
    const drinksRecipes = doneRecipes.filter((recipe) => recipe.type === 'bebida');
    setFilteredRecipes(drinksRecipes);
  };

  return { filteredRecipes, resetFilter, foodFilter, drinksFilter };
}

export default UseDoneRecipes;
