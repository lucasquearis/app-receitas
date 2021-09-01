import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Loading from '../components/Loading';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsCheckboxList from '../components/IngredientsCheckboxList';
import RecipeAllDoneContext from '../context/RecipeAllDone';

const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const getIdFromURL = (pathname) => pathname.split('/')[2];

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
      <img src={ drink.strDrinkThumb } alt="recipe" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <div data-testid="recipe-category">{drink.strCategory}</div>
      <div data-testid="recipe-glass">{drink.strGlass}</div>
      <div data-testid="recipe-alcoholic">{drink.strAlcoholic}</div>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <FavoriteButton foodOrDrink={ drink } />
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
