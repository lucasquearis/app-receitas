import React from 'react';
import Proptypes from 'prop-types';
import RecipeCard from './RecipeCard';
import './RecipesList.css';

function RecipesList(props) {
  const { recipesData, recipeKey } = props;
  // console.log(recipesData);
  const renderRecipesList = () => recipesData.map((recipe, index) => {
    const title = `str${recipeKey}`;
    const thumb = `str${recipeKey}Thumb`;
    const id = `id${recipeKey}`;
    let path = '';
    if (recipeKey === 'Meal') path = 'comidas';
    if (recipeKey === 'Drink') path = 'bebidas';
    return (
      <RecipeCard
        key={ recipe[id] }
        id={ recipe[id] }
        thumb={ recipe[thumb] }
        title={ recipe[title] }
        index={ index }
        path={ path }
      />);
  });

  return (
    <ul className="recipesList-container">
      { renderRecipesList() }
    </ul>
  );
}

RecipesList.propTypes = {
  recipesData: Proptypes.arrayOf(Proptypes.object).isRequired,
  recipeKey: Proptypes.string.isRequired,
};

export default RecipesList;
