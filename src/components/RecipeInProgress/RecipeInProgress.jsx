import React from 'react';
import propTypes from 'prop-types';
import Checkbox from '../Ingredients/Checkbox';
import HeroDetails from '../HeroDetails/HeroDetails';
import Video from '../Video/Video';

function RecipeInProgress({ recipe, type }) {
  return (
    <>
      <HeroDetails recipe={ recipe } type={ type } />
      <Checkbox recipe={ recipe } />
      <section>
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </section>
      { recipe.strYoutube && <Video recipe={ recipe } />}
      <button type="button" data-testid="finish-recipe-btn">
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
