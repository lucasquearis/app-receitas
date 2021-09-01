import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import FavoriteButton from '../components/FavoriteButton';
import IngredientsCheckboxList from '../components/IngredientsCheckboxList';
import Loading from '../components/Loading';
import RecipeAllDoneContext from '../context/RecipeAllDone';
import shareIcon from '../images/shareIcon.svg';

const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const getIdFromURL = (pathname) => pathname.split('/')[2];

async function copyPageUrl() {
  const sliceUntil = -12;
  try {
    await navigator.clipboard.writeText(
      window.location.href.slice(-window.location.href.length, sliceUntil),
    );
    console.log('Link copiado!');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
  document.getElementById('share-button').innerHTML = 'Link copiado!';
}

const ComidasEmProcesso = () => {
  const [food, setFood] = useState();
  const [allDone, setAllDone] = useState(false);
  const history = useHistory();
  const idURL = getIdFromURL(history.location.pathname);

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_FOOD}${idURL}`);
      const data = await response.json();
      setFood(data.meals[0]);
    };
    api();
  }, [idURL]);

  if (food === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <img
        src={ food.strMealThumb }
        alt="recipe"
        data-testid="recipe-photo"
        style={ { width: '100%' } }
      />
      <h2 data-testid="recipe-title">{food.strMeal}</h2>
      <button
        id="share-button"
        type="button"
        onClick={ copyPageUrl }
      >
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt="Botão copiar compartilhar esta receita"
        />
      </button>
      <FavoriteButton
        foodOrDrink={ food }
        dataTestId="favorite-btn"
      />
      <RecipeAllDoneContext.Provider value={ { setAllDone } }>
        <IngredientsCheckboxList foodOrDrink={ food } />
      </RecipeAllDoneContext.Provider>
      <p data-testid="recipe-category">{food.strCategory}</p>
      <p data-testid="instructions">{food.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allDone }
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </div>
  );
};

export default ComidasEmProcesso;
