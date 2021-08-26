import React, { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContext';
import RecipeCard from '../RecipeCard';

function RecipeContainer() {
  const { recipes, tag } = useContext(RecipesContext);
  if (!recipes) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return;
  }
  return (
    <div>
      {
        recipes.map((e, index) => (<RecipeCard
          key={ e[`id${tag}`] }
          recipe={ e }
          index={ index }
          tag={ tag }
        />))
      }
    </div>
  );
}

export default RecipeContainer;
