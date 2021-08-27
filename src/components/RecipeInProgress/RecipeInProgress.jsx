import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Checkbox from '../Ingredients/Checkbox';
import HeroDetails from '../HeroDetails/HeroDetails';
import Video from '../Video/Video';
import UseFinishRecipe from '../../hook/UseFinishRecipe';

function RecipeInProgress({ recipe, type }) {
  const [allChecked, setAllCheked] = useState(false);
  const { redirect, finishRecipe } = UseFinishRecipe(recipe, type);

  const allIngredientsChecked = (array1, array2) => {
    if (array1.length === array2.length) {
      setAllCheked(true);
    } else {
      setAllCheked(false);
    }
  };

  if (redirect) {
    return <Redirect to="/receitas-feitas" />;
  }

  return (
    <>
      <HeroDetails recipe={ recipe } type={ type } />
      <Checkbox recipe={ recipe } type={ type } allChecked={ allIngredientsChecked } />
      <section>
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </section>
      { recipe.strYoutube && <Video recipe={ recipe } />}
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allChecked }
        className="finish-recipe"
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
    </>
  );
}

RecipeInProgress.propTypes = {
  recipe: propTypes.shape({
    id: propTypes.string,
    strInstructions: propTypes.string,
    strYoutube: propTypes.string,
  }).isRequired,
  type: propTypes.string.isRequired,
};

export default RecipeInProgress;
