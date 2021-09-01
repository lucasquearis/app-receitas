import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import AppContext from '../../context/AppContext';
import { fetchApi } from '../../services';

import {
  DetailsWrapper,
  VideoWrapper,
  BtnStart,
} from './style';

import RecommendationCarousel from '../../components/RecommentionCarousel';
import FavoriteBtn from '../../components/FavoriteBtn';
import IngredientsList from '../../components/IngredientsList';
import CategorySubTitle from '../../components/CategorySubTitle';

import shareIcon from '../../images/shareIcon.svg';

function Details({ recipeEndPoint, recommendationEndPoint }) {
  const { doneRecipes, inProgressRecipes } = useContext(AppContext);

  const { id } = useParams();
  const { pathname } = useLocation();

  const { push } = useHistory();

  const keyType = (pathname.includes('comidas')) ? 'Meal' : 'Drink';
  const recipeType = (pathname.includes('comidas')) ? 'meals' : 'drinks';

  const [recipe, setMeal] = useState({
    strYoutube: '',
  });
  const [suggestionList, setSuggestionList] = useState([]);
  const [showStartBtn, setShowStartBtn] = useState(true);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  useEffect(
    () => {
      const enRecipeType = (pathname.includes('comidas')) ? 'meals' : 'cocktails';
      setShowStartBtn(!doneRecipes.some((doneRecipe) => doneRecipe.id === id));
      setIsInProgress(
        Object.keys(inProgressRecipes[enRecipeType])
          .some((inProgressRecipeId) => inProgressRecipeId === id),
      );
    },
    [id, doneRecipes, inProgressRecipes, pathname],
  );

  useEffect(() => {
    const getMeal = async () => {
      const recipeData = await fetchApi(`${recipeEndPoint}${id}`);
      setMeal(recipeData[recipeType][0]);
    };

    const getSuggestionList = async () => {
      const suggestionRecipeType = (pathname.includes('comidas')) ? 'drinks' : 'meals';
      const suggestions = await fetchApi(recommendationEndPoint);
      console.log(suggestions[suggestionRecipeType]);
      setSuggestionList(suggestions[suggestionRecipeType]);
    };

    getSuggestionList();
    getMeal();
  }, [id, pathname, recipeEndPoint, recipeType, recommendationEndPoint]);

  const shareClick = async () => {
    try {
      await clipboardCopy(`http://localhost:3000${pathname}`);
      setShowCopyMessage(true);
      const messageRemoveTime = 3000;
      setTimeout(() => setShowCopyMessage(false), messageRemoveTime);
    } catch (error) {
      console.log(error);
    }
  };

  const startClick = () => {
    push(`${pathname}/in-progress`);
  };

  return (
    <DetailsWrapper>
      <img
        alt={ recipe[`str${keyType}`] }
        data-testid="recipe-photo"
        src={ recipe[`str${keyType}Thumb`] }
        className="main-img"
      />
      <h1 data-testid="recipe-title">{ recipe[`str${keyType}`] }</h1>
      <input
        alt="share-btn"
        data-testid="share-btn"
        onClick={ shareClick }
        src={ shareIcon }
        type="image"
      />
      {showCopyMessage && <h5>Link copiado!</h5>}
      {(recipe[`str${keyType}Thumb`]) && <FavoriteBtn
        id={ id }
        type={ (keyType === 'Meal') ? 'comida' : 'bebida' }
        area={ recipe.strArea }
        category={ recipe.strCategory }
        alcoholicOrNot={ recipe.strAlcoholic }
        name={ recipe[`str${keyType}`] }
        image={ recipe[`str${keyType}Thumb`] }
      />}

      <CategorySubTitle recipe={ recipe } />

      <IngredientsList recipe={ recipe } />

      <p data-testid="instructions">{recipe.strInstructions}</p>

      { (pathname.includes('comidas')) && (
        <VideoWrapper>
          <h3>Vídeo</h3>
          <iframe
            width="340"
            title="recipeVideo"
            data-testid="video"
            frameBorder="0"
            allowFullScreen
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
          />
        </VideoWrapper>)}
      <div>
        <RecommendationCarousel suggestionList={ suggestionList } />
      </div>
      { showStartBtn && (
        <BtnStart
          data-testid="start-recipe-btn"
          type="button"
          onClick={ startClick }
        >
          { (isInProgress) ? 'Continuar Receita' : 'Iniciar Receita' }
        </BtnStart>)}
    </DetailsWrapper>
  );
}

Details.propTypes = {
  recipeEndPoint: PropTypes.string.isRequired,
  recommendationEndPoint: PropTypes.string.isRequired,
};

export default Details;
