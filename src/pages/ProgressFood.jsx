import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import FinishRecipeButton from '../components/FinishRecipeButton';
import shareIcon from '../images/shareIcon.svg';
import bHIcon from '../images/blackHeartIcon.svg';
import wHIcon from '../images/whiteHeartIcon.svg';
import initialStep from '../helpers/InitialValues';
import IngredientsCheckList from '../components/IngredientsCheckList';

function ProgressFood({
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
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const mealRecipe = await fetch(url)
        .then((response) => response.json())
        .then((data) => data.meals[0]);
      setRecipe(mealRecipe);
    };
    getRecipe();
  }, [id]);

  useEffect(() => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!progressRecipes || !progressRecipes.meals[id]) {
      setcheckList(initialStep);
    } else {
      setcheckList(progressRecipes.meals[id]);
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
      cocktails: {},
      meals: {
        [id]: recipeChecklist,
      },
    };
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!progressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressObject));
    } else {
      const updateProgress = {
        cocktails: {
          ...progressRecipes.cocktails,
        },
        meals:
        {
          ...progressRecipes.meals,
          [id]: recipeChecklist,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(updateProgress));
    }
  };

  const saveFavoriteRecipes = () => {
    const { strArea, strCategory, strMeal, strMealThumb } = recipe;
    const favoriteObject = [{
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
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
        <FinishRecipeButton
          disable={ disable }
          recipe={ recipe }
          type="comida"
        />
      </div>
    );
  };

  const renderRecipeInProgress = () => {
    const { strMealThumb, strMeal, strCategory, strInstructions } = recipe;

    return (
      <div>
        <img src={ strMealThumb } alt="meal thumb" data-testid="recipe-photo" />
        <h2 data-testid="recipe-title">{strMeal}</h2>
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

ProgressFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProgressFood;
