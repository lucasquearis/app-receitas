import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Ingredients from '../Ingredients/Ingredients';
import HeroDetails from '../HeroDetails/HeroDetails';
import Video from '../Video/Video';
import UseRecipeStatus from '../../hook/UseRecipeStatus';

function RecipeDetails({ recipe, type }) {
  const { recipeIsDone, recipeInProgress } = UseRecipeStatus(recipe, type);
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
      {!recipeIsDone && (
        <Link
          to={ (type === 'Meal') ? `/comidas/${recipe[`id${type}`]}/in-progress`
            : `/bebidas/${recipe[`id${type}`]}/in-progress` }
        >
          <button type="button" data-testid="start-recipe-btn" className="start-recipe">
            { recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        </Link>
      )}
    </>
  );
}

RecipeDetails.propTypes = {
  recipe: propTypes.shape({
    id: propTypes.string,
    strInstructions: propTypes.string,
    strYoutube: propTypes.string,
  }).isRequired,
  type: propTypes.string.isRequired,
};

export default RecipeDetails;
