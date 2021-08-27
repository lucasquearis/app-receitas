import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import bHIcon from '../images/blackHeartIcon.svg';
import wHIcon from '../images/whiteHeartIcon.svg';
import initialStep from '../helpers/InitialValues';
import IngredientsCheckList from '../components/IngredientsCheckList';

function ProgressDrink({
  match: {
    params: { id },
  },
}) {
  const [recipe, setRecipe] = useState({});
  const [steps, setSteps] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(wHIcon);
  const [checkList, setcheckList] = useState(initialStep);

  useEffect(() => {
    const getRecipe = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const drinkRecipe = await fetch(url)
        .then((response) => response.json())
        .then((data) => data.drinks[0]);
      setRecipe(drinkRecipe);
    };
    getRecipe();
  }, [id]);

  useEffect(() => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!progressRecipes || !progressRecipes.cocktails[id]) {
      setcheckList(initialStep);
    } else {
      setcheckList(progressRecipes.cocktails[id]);
    }
    if (favoriteRecipes) {
      const isFavorite = favoriteRecipes.some((fav) => fav.id === id);
      if (isFavorite) {
        setFavorite(true);
      }
    }
  }, [recipe, id]);

  useEffect(() => {
    const stepArray = [];
    const maxIngredients = 20;
    for (let index = 0; index < maxIngredients; index += 1) {
      const ingredient = recipe[`strIngredient${index}`];
      const measure = recipe[`strMeasure${index}`];
      if (ingredient) {
        stepArray.push({
          ingredient,
          measure,
          checked: checkList[index - 1],
        });
      }
    }
    setSteps(stepArray);
  }, [recipe, checkList]);

  useEffect(() => {
    if (favorite) {
      setFavoriteIcon(bHIcon);
    } else {
      setFavoriteIcon(wHIcon);
    }
  }, [favorite]);

  const saveLocalProgress = () => {
    const recipeChecklist = checkList.slice(0, steps.length);
    const progressObject = {
      cocktails: {
        [id]: recipeChecklist,
      },
      meals: {},
    };
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!progressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
    } else {
      const updateProgress = {
        cocktails: {
          ...progressRecipes.cocktails,
          [id]: recipeChecklist,
        },
        meals:
        {
          ...progressRecipes.meals,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updateProgress));
    }
  };

  const saveFavoriteRecipes = () => {
    const { strCategory, strDrink, strDrinkThumb, strAlcoholic } = recipe;
    const favoriteObject = [{
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    }];
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteObject));
    } else {
      const updateFavorite = [
        ...favoriteRecipes,
        ...favoriteObject,
      ];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updateFavorite));
    }
  };

  const deleteFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const updateFavorite = favoriteRecipes.filter((rec) => rec.id !== id);
    if (updateFavorite.length === 0) {
      localStorage.removeItem('favoriteRecipes');
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(updateFavorite));
    }
  };

  const handleCheck = (selectedIndex) => {
    const newChecks = checkList;
    for (let index = 0; index < steps.length; index += 1) {
      if (index === selectedIndex) {
        newChecks[index] = !newChecks[index];
      }
    }
    setcheckList([
      ...newChecks,
    ]);
    saveLocalProgress();
  };

  const handleShare = () => {
    const discartUrl = -12;
    copy(window.location.href.slice(0, discartUrl));
    setCopyLink(true);
  };

  const handleFavorite = () => {
    if (favorite) {
      deleteFavoriteRecipes();
    } else {
      saveFavoriteRecipes();
    }
    setFavorite(!favorite);
  };

  const renderFinishButton = () => {
    if (steps.length === 0) {
      return (
        <div />
      );
    }
    const disable = steps.some((step) => step.checked === false);
    return (
      <div>
        <Link to="/receitas-feitas">
          <Button
            data-testid="finish-recipe-btn"
            variant="contained"
            color="primary"
            disabled={ disable }
          >
            Finalizar Receita
          </Button>
        </Link>
      </div>
    );
  };

  const renderRecipeInProgress = () => {
    const { strDrinkThumb, strDrink, strCategory, strInstructions } = recipe;

    return (
      <div>
        <img src={ strDrinkThumb } alt="meal thumb" data-testid="recipe-photo" />
        <h2 data-testid="recipe-title">{strDrink}</h2>
        <Button
          data-testid="share-btn"
          variant="contained"
          color="primary"
          onClick={ handleShare }
        >
          <img src={ shareIcon } alt="share-icon" />
        </Button>
        <Button variant="contained" color="primary" onClick={ handleFavorite }>
          <img data-testid="favorite-btn" src={ favoriteIcon } alt="heart-icon" />
        </Button>
        {copyLink && <Chip label="Link copiado!" variant="outlined" size="small" />}
        <h4 data-testid="recipe-category">{strCategory}</h4>
        <IngredientsCheckList steps={ steps } handleCheck={ handleCheck } />
        <p data-testid="instructions">{strInstructions}</p>
        {renderFinishButton()}
      </div>
    );
  };

  return (
    <div>
      {renderRecipeInProgress()}
    </div>
  );
}

ProgressDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProgressDrink;
