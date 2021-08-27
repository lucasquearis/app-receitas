import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '../../Components/IconBtn';
import Vid from '../../Components/Vid';
import Btn from '../../Components/Btn';
import Food from '../../Components/Food';
import './RecipeDetails.css';

import { ContextApp } from '../../Context/ContextApp';

import List from '../../Components/List';

function RecipeDetails({ match: { params } }) {
  const { handleRecipe, singleRecipe, drinks, meal } = useContext(ContextApp);
  if (!singleRecipe) {
    handleRecipe(params);
    return (
      <div>Loading</div>
    );
  }
  const titleProps = {
    'data-testid': 'recipe-title',
  };
  const imgProps = {
    width: '360',
    src: singleRecipe.strMealThumb || singleRecipe.strDrinkThumb,
    'data-testid': 'recipe-photo',
  };
  const shareBtn = {
    name: 'share',
    'data-testid': 'share-btn',
    icon: ShareIcon,
    alt: 'shareIcon',
    type: 'button',
    variant: 'contained',
  };
  const favBtn = {
    name: 'favorite',
    'data-testid': 'favorite-btn',
    icon: FavoriteIcon,
    alt: 'favoriteIcon',
    type: 'button',
    variant: 'contained',
  };
  const categoryProps = {
    'data-testid': 'recipe-category',
  };
  const InstructionProps = {
    'data-testid': 'instructions',
  };
  const vidProps = {
    'data-testid': 'video',
    width: '360',
    height: '202',
    frameBorder: '0',
    allow: 'clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    allowFullScreen: '1',
    src: singleRecipe.strYoutube ? `https://www.youtube.com/embed/${singleRecipe.strYoutube.split('=')[1]}` : null,
  };
  const btnProps = {
    name: 'Iniciar Receita',
    'data-testid': 'start-recipe-btn',
    type: 'button',
    variant: 'contained',
    style: {
      position: 'fixed',
      bottom: 0,
    },
  };
  const arr = Object.keys(singleRecipe)
    .filter((e) => e.includes('strIngredient')
    && singleRecipe[e] !== null && singleRecipe[e] !== '');

  return (
    <>
      <h1 { ...titleProps }>{singleRecipe.strMeal || singleRecipe.strDrink}</h1>
      <img alt="pgo" { ...imgProps } />
      <IconButton { ...shareBtn } />
      <IconButton { ...favBtn } />
      <h2 { ...categoryProps }>
        { singleRecipe.strAlcoholic
          ? singleRecipe.strAlcoholic : singleRecipe.strCategory}
      </h2>
      {arr.map((e, i) => (<List
        primary={ `${singleRecipe[e]}: ${singleRecipe[`strMeasure${i + 1}`]}` }
        key={ i }
        testid={ `${i}-ingredient-name-and-measure` }
      />))}
      <p { ...InstructionProps }>{singleRecipe.strInstructions}</p>
      <Vid { ...vidProps } />
      <div className="carousel">
        { (params.feedType === 'comidas')
          ? <Food recipes={ drinks } maxRecipes={ 6 } />
          : <Food recipes={ meal } maxRecipes={ 6 } />}
      </div>
      <Btn { ...btnProps } />
    </>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      feedType: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default RecipeDetails;
