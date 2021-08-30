import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ShareBtn from '../components/ShareBtn';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { drinkById } from '../utils/fetchAPIbyID';

function DrinksInProgress() {
  const { idDrink } = useParams();
  const [drinkDetails, setDrinkDetails] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [progress, setProgress] = useState([]);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    const fetchDrink = async () => {
      const drink = await drinkById(idDrink);
      setDrinkDetails(drink);
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inProgressRecipes && progress
        .length === 0 && Object.keys(inProgressRecipes.cocktails)
        .some((key) => key === idDrink)) {
        const { cocktails } = inProgressRecipes;
        const loadedProgress = cocktails[idDrink];
        setProgress(loadedProgress);
        const inputs = document.querySelectorAll('input');
        if (inputs) {
          inputs.forEach((input) => {
            if (loadedProgress.some((value) => value === input.parentElement
              .querySelector('label').innerText)) {
              input.defaultChecked = true;
              input.parentElement
                .querySelector('label').style.textDecoration = 'line-through';
            }
          });
        }
      }
    };
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const isFavorite = () => favoriteRecipes
        .some((recipe) => recipe.id === idDrink) && document.getElementById('fav-btn')
        .setAttribute('src', blackHeartIcon);
      isFavorite();
    }
    fetchDrink();
  }, [idDrink, progress]);

  const retObj = Object.entries(drinkDetails);
  const listIngredients = retObj.filter((drink) => (
    drink[0].includes('Ingredient') && drink[1]
  ));
  const filterAlcoohol = retObj.filter((drink) => {
    const noAlcool = drink[1] !== ' ' && drink[1] !== null;
    return drink[0].includes('Measure') && noAlcool;
  });

  const progressRecipe = (labelValue) => {
    let updatedProgress = [];
    console.log(labelValue);
    if (!progress.some((value) => value === labelValue)) {
      updatedProgress = progress.concat(labelValue);
      setProgress(updatedProgress);
    } else {
      updatedProgress = progress.filter((ingredient) => ingredient !== labelValue);
      setProgress(updatedProgress);
    }
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      inProgressRecipes = {
        cocktails: { [idDrink]: updatedProgress },
      };
    } else {
      let { cocktails } = inProgressRecipes;
      if (inProgressRecipes.cocktails) {
        cocktails[idDrink] = updatedProgress;
      } else {
        const recipeProgress = { [idDrink]: [...updatedProgress] };
        cocktails = { ...cocktails, ...recipeProgress };
      }
      inProgressRecipes.cocktails = cocktails;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  const finishRecipe = () => {
    const { strCategory, strDrinkThumb, strDrink, strTags } = drinkDetails;
    const d = new Date();
    const dataDMY = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
    const dataTIME = `${d.getHours()}hrs${d.getMinutes()}min`;
    let arrTag;
    if (strTags) {
      arrTag = strTags.split(',');
    } else {
      arrTag = null;
    }
    const finishedRecipeToken = {
      id: idDrink,
      type: 'bebida',
      area: null,
      category: strCategory,
      alcoholicOrNot: null,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: `${dataDMY} às ${dataTIME}`,
      tags: arrTag,
    };
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if ((Object.keys(inProgressRecipes)
      .length && Object.keys(inProgressRecipes.cocktails).length) === 1) {
      localStorage.removeItem('inProgressRecipes');
    } else {
      delete inProgressRecipes.cocktails[idDrink];
    }
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      doneRecipes.push(finishedRecipeToken);
    } else {
      doneRecipes = [finishedRecipeToken];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    setRedirect(true);
  };

  const isDisabled = () => {
    const el = document.querySelectorAll('input');
    if (!(Array.from(el).every((x) => x.checked))) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const setFavorite = () => {
    const { strDrinkThumb, strDrink, strAlcoholic, strCategory } = drinkDetails;

    const favoriteRecipeToken = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };

    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      if (favoriteRecipes.every((recipe) => recipe.id !== favoriteRecipeToken.id)) {
        favoriteRecipes.push(favoriteRecipeToken);
        document.getElementById('fav-btn').setAttribute('src', blackHeartIcon);
      } else {
        favoriteRecipes = favoriteRecipes
          .filter((recipe) => recipe.id !== favoriteRecipeToken.id);
        document.getElementById('fav-btn').setAttribute('src', whiteHeartIcon);
      }
    } else {
      favoriteRecipes = [favoriteRecipeToken];
      console.log(process.env);
      document.getElementById('fav-btn').setAttribute('src', blackHeartIcon);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    if (Object.values(favoriteRecipes).length === 0) {
      localStorage.removeItem('favoriteRecipes');
    }
  };
  return (
    <div onChange={ isDisabled }>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ drinkDetails.strDrink }</h1>

      <ShareBtn id={ idDrink } type="bebida" />
      <button type="button" onClick={ setFavorite }>
        <img
          id="fav-btn"
          src={ whiteHeartIcon }
          alt="favoritar"
          data-testid="favorite-btn"
        />
      </button>
      <h2 data-testid="recipe-category">{ drinkDetails.strAlcoholic }</h2>
      <h3>Ingredientes:</h3>
      <ul>
        {listIngredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              onClick={ (ev) => {
                if (ev.target.defaultChecked) {
                  ev.target.defaultChecked = false;
                  ev.target.checked = false;
                } else {
                  ev.target.defaultChecked = true;
                  ev.target.checked = true;
                }
              } }
              onChange={ (ev) => {
                const label = ev.target.parentElement.querySelector('label');
                progressRecipe(label.innerText);
                if (ev.target.defaultChecked) {
                  label.style.textDecoration = 'line-through';
                } else if (!ev.target.defaultChecked) {
                  ev.target.defaultChecked = false;
                  label.style.textDecoration = 'none';
                }
              } }
              type="checkbox"
              id={ `${index}-ingredient-step` }
            />
            <label htmlFor={ `${index}-ingredient-step` }>
              {filterAlcoohol[index] ? (
                `${ingredient[1]} - ${filterAlcoohol[index][1]}`
              ) : (ingredient[1])}
            </label>
          </li>
        ))}
      </ul>
      <h4>Instructions: </h4>
      <h2 data-testid="instructions">{ drinkDetails.strInstructions }</h2>
      <button
        disabled={ disabled }
        type="button"
        data-testid="finish-recipe-btn"
        className="finishRecipe"
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
      { redirect && <Redirect to="/receitas-feitas" />}
    </div>
  );
}

export default DrinksInProgress;
