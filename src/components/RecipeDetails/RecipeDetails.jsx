import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Ingredients from '../Ingredients/Ingredients';
import HeroDetails from '../HeroDetails/HeroDetails';
import Video from '../Video/Video';
import UseRecipeStatus from '../../hook/UseRecipeStatus';
import { Section, Div, H3, P, VideoSection, DetailBtn } from './styles';

function RecipeDetails({ recipe, type }) {
  const { recipeInProgress } = UseRecipeStatus(recipe, type);
  return (
    <>
      <HeroDetails recipe={ recipe } type={ type } />
      <Ingredients recipe={ recipe } />
      <Section>
        <Div>
          <H3>Instructions</H3>
          <P data-testid="instructions">{recipe.strInstructions}</P>
        </Div>
      </Section>
      <Section>
        <VideoSection>
          { recipe.strYoutube && <Video recipe={ recipe } />}
        </VideoSection>
      </Section>
      <H3 recomendado>Recomendados</H3>
      <Link
        to={ (type === 'Meal') ? `/comidas/${recipe[`id${type}`]}/in-progress`
          : `/bebidas/${recipe[`id${type}`]}/in-progress` }
      >
        <DetailBtn type="button" data-testid="start-recipe-btn" className="start-recipe">
          { recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
        </DetailBtn>
      </Link>
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
