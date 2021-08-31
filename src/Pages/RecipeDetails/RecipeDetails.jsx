import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Share, Favorite as blackHeartIcon,
  FavoriteBorder as whiteHeartIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import IconButton from '../../Components/IconBtn';
import Vid from '../../Components/Vid';
import Btn from '../../Components/Btn';
import Food from '../../Components/Food';
import './RecipeDetails.css';
import { ContextApp } from '../../Context/ContextApp';
import List from '../../Components/List';
import ModalHook from '../../Hooks/ModalHook';

Modal.setAppElement('#root');

function RecipeDetails({ match: { params } }) {
  const { feedType, id } = params;
  const { handleCopy, closeModal, modal, modalStyles } = ModalHook();
  const {
    handleRecipe, singleRecipe, drinks, meal, handleStart, doneRecipe,
    handleBtnType, handleFav, fav,
  } = useContext(ContextApp);

  if (!singleRecipe) {
    handleRecipe(params);
    return (
      <div>Loading</div>
    );
  }

  console.log(singleRecipe);

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
    icon: Share,
    alt: 'shareIcon',
    type: 'button',
    variant: 'contained',
    onClick: handleCopy,
  };
  const favBtn = {
    name: 'favorite',
    'data-testid': 'favorite-btn',
    icon: fav ? blackHeartIcon : whiteHeartIcon,
    alt: 'favoriteIcon',
    type: 'button',
    variant: 'contained',
    onClick: handleFav,
    src: fav ? 'blackHeartIcon' : 'whiteHeartIcon',
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
    name: handleBtnType(params),
    'data-testid': 'start-recipe-btn',
    type: 'button',
    variant: 'contained',
    style: {
      position: 'fixed',
      bottom: 0,
    },
    onClick: () => handleStart(params),
  };
  const modalProps = {
    isOpen: modal,
    onRequestClose: closeModal,
    style: modalStyles,
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
      {!doneRecipe.some((e) => e.id === id)
        ? <Link to={ `/${feedType}/${id}/in-progress` }><Btn { ...btnProps } /></Link>
        : null}
      <Modal { ...modalProps }>Link copiado!</Modal>
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
