import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import AppContext from '../../context/AppContext';
import { fetchApi } from '../../services';

import {
  DetailsWrapper,
  BtnStart,
} from './style';

import FavoriteBtn from '../../components/FavoriteBtn';
import CategorySubTitle from '../../components/CategorySubTitle';
import CheckBox from '../../components/Checkbox';
import shareIcon from '../../images/shareIcon.svg';

function Progress({ recipeEndPoint, recommendationEndPoint }) {
  const { doneRecipes } = useContext(AppContext);

  const { id } = useParams();
  const { pathname } = useLocation();

  const { push } = useHistory();

  const keyType = (pathname.includes('comidas')) ? 'Meal' : 'Drink';
  const recipeType = (pathname.includes('comidas')) ? 'meals' : 'drinks';

  const [recipe, setMeal] = useState({
    strYoutube: '',
  });
  const [showStartBtn, setShowStartBtn] = useState(true);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  useEffect(
    () => {
      setShowStartBtn(!doneRecipes.some((doneRecipe) => doneRecipe.id === id));
    },
    [id, doneRecipes, pathname],
  );

  useEffect(() => {
    const getMeal = async () => {
      const recipeData = await fetchApi(`${recipeEndPoint}${id}`);
      setMeal(recipeData[recipeType][0]);
    };

    getMeal();
  }, [id, pathname, recipeEndPoint, recipeType, recommendationEndPoint]);

  const shareClick = async () => {
    try {
      const url = pathname.replace('/in-progress', '');
      await clipboardCopy(`http://localhost:3000${url}`);
      setShowCopyMessage(true);
      const messageRemoveTime = 3000;
      setTimeout(() => setShowCopyMessage(false), messageRemoveTime);
    } catch (error) {
      console.log(error);
    }
  };

  const startClick = () => {
    push('/receitas-feitas');
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

      <CheckBox recipe={ recipe } />

      <p data-testid="instructions">{recipe.strInstructions}</p>

      { showStartBtn && (
        <BtnStart
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ startClick }
        >
          Finalizar Receita
        </BtnStart>)}
    </DetailsWrapper>
  );
}

Progress.propTypes = {
  recipeEndPoint: PropTypes.string.isRequired,
  recommendationEndPoint: PropTypes.string.isRequired,
};

export default Progress;
