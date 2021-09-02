import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  DetailsWrapper,
  Image, Tittle, Category,
  Ingrediente, Instructions, Video, Start, ShareButton, Favorite, Checkbox,
} from './styles';
import useDetails from '../../hooks/useDetails';
import useLocal from '../../hooks/useLocal';
import useCopy from '../../hooks/useCopy';
import useInProgress from '../../hooks/useInProgress';
import { RecipesContext } from '../../context/RecipesContext';

function InProgress({ type, routeParams }) {
  const { newRecipeDone } = useContext(RecipesContext);
  const { details } = useDetails(type, routeParams[0]);
  const { copy, share } = useCopy();
  const { filteredFav, addToFav } = useLocal(type);
  const { setToLocal, recipe } = useInProgress(type, details);
  const length = () => {
    const ingredients = Object.entries(details)
      .filter((entries) => entries[0]
        .includes('strIngredient') && entries[1] !== null && entries[1] !== '');
    return ingredients.length;
  };

  return (
    <DetailsWrapper>
      <Image
        data-testid="recipe-photo"
        src={ `${details[`str${details.prefix}Thumb`]}` }
      />
      <Tittle data-testid="recipe-title">{ details[`str${details.prefix}`] }</Tittle>
      <Category data-testid="recipe-category">
        {details.prefix === 'Drink' ? details.strAlcoholic : details.strCategory}
      </Category>
      <ShareButton onClick={ share } data-testid="share-btn">{copy}</ShareButton>
      <Favorite
        src={ filteredFav.some(
          (e) => e.id === details[`id${details.prefix}`],
        ) ? '/images/blackHeartIcon.svg' : '/images/whiteHeartIcon.svg' }
        onClick={ () => addToFav(details) }
        data-testid="favorite-btn"
      >
        Favoritar
      </Favorite>
      <div>
        {
          Object.entries(details)
            .filter((entries) => entries[0]
              .includes('strIngredient') && entries[1] !== null && entries[1] !== '')
            .map((e, index) => (
              <Ingrediente
                data-testid={ `${index}-ingredient-step` }
                key={ e[1] }
              >
                <Checkbox
                  type="checkbox"
                  { ...recipe.some(
                    (dale) => dale === e[1],
                  ) ? { defaultChecked: true } : null }
                  onClick={ () => setToLocal(e[1]) }
                />
                {`${e[1]}, ${details[`strMeasure${[index + 1]}`]}`}
              </Ingrediente>
            ))
        }
      </div>
      <Instructions
        data-testid="instructions"
      >
        {details.strInstructions}
      </Instructions>
      <Video data-testid="video" />
      <Start
        onClick={ () => newRecipeDone(details) }
        data-testid="finish-recipe-btn"
        disabled={ length() !== recipe.length }
      >
        Finalizar Receita
      </Start>
    </DetailsWrapper>
  );
}

InProgress.propTypes = {
  type: PropTypes.string.isRequired,
  routeParams: PropTypes.arrayOf(String).isRequired,
};

export default InProgress;
