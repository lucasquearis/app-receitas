import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Checkbox from '../Ingredients/Checkbox';
import HeroDetails from '../HeroDetails/HeroDetails';
import Video from '../Video/Video';
import UseFinishRecipe from '../../hook/UseFinishRecipe';
import { IngredientH3, Div, IngredintSection, P,
  Main, VideoSection, Section, FinishBtn } from './styles';

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
    <Main>
      <HeroDetails recipe={ recipe } type={ type } />
      <IngredintSection>
        <Div>
          <Checkbox
            recipe={ recipe }
            type={ type }
            allChecked={ allIngredientsChecked }
          />
        </Div>
      </IngredintSection>
      <IngredintSection>
        <Div>
          <IngredientH3>Instructions</IngredientH3>
          <P data-testid="instructions">{recipe.strInstructions}</P>
        </Div>
      </IngredintSection>
      <Section>
        <VideoSection>
          { recipe.strYoutube && <Video recipe={ recipe } />}
        </VideoSection>
      </Section>
      <FinishBtn
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allChecked }
        className="finish-recipe"
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </FinishBtn>
    </Main>
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
