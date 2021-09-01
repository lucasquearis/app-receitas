import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Loading from '../components/Loading';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsCheckboxList from '../components/IngredientsCheckboxList';
import RecipeAllDoneContext from '../context/RecipeAllDone';
import shareIcon from '../images/shareIcon.svg';

const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

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

const BebidasEmProcesso = () => {
  const [drink, setDrink] = useState();
  const [allDone, setAllDone] = useState(false);
  const history = useHistory();
  const idURL = getIdFromURL(history.location.pathname);

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_DRINK}${idURL}`);
      const data = await response.json();
      setDrink(data.drinks[0]);
    };
    api();
  }, [idURL]);

  if (drink === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <img
        src={ drink.strDrinkThumb }
        alt="recipe"
        data-testid="recipe-photo"
        style={ { width: '100%' } }
      />
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <div data-testid="recipe-category">{drink.strCategory}</div>
      <div data-testid="recipe-glass">{drink.strGlass}</div>
      <div data-testid="recipe-alcoholic">{drink.strAlcoholic}</div>
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
        foodOrDrink={ drink }
        dataTestId="favorite-btn"
      />
      <RecipeAllDoneContext.Provider value={ { setAllDone } }>
        <IngredientsCheckboxList foodOrDrink={ drink } />
      </RecipeAllDoneContext.Provider>
      <p data-testid="instructions">{drink.strInstructions}</p>
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

export default BebidasEmProcesso;
