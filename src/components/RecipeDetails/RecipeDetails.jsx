import React from 'react';
import propTypes from 'prop-types';
import Ingredients from '../Ingredients/Ingredients';
import HeroDetails from '../HeroDetails/HeroDetails';
import Video from '../Video/Video';

function RecipeDetails({ recipe, type }) {
  return (
    <>
      <HeroDetails recipe={ recipe } type={ type } />
      <Ingredients recipe={ recipe } />
      <section>
        <h3>Instructions</h3>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </section>
      { recipe.strYoutube && <Video recipe={ recipe } />}
      <h3>Recomendados</h3>
      <button type="button" data-testid="start-recipe-btn" className="start-recipe">
        Iniciar Receita
      </button>
    </>
  );
}

RecipeDetails.propTypes = {
  recipe: propTypes.shape({
    strInstructions: propTypes.string,
    strYoutube: propTypes.string,
  }).isRequired,
  type: propTypes.string.isRequired,
};

export default RecipeDetails;
