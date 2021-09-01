import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import IngredientsCheckboxList from '../components/IngredientsCheckboxList';
import Loading from '../components/Loading';
import RecipeAllDoneContext from '../context/RecipeAllDone';

const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const getIdFromURL = (pathname) => pathname.split('/')[2];

const ComidasEmProcesso = () => {
  const [food, setFood] = useState();
  const [allDone, setAllDone] = useState(false);
  const history = useHistory();
  const idURL = getIdFromURL(history.location.pathname);

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_FOOD}${idURL}`);
      const data = await response.json();
      const meal = data.meals[0];
      setFood(meal);
    };
    api();
  }, [idURL]);

  if (food === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <img src={ food.strMealThumb } alt="recipe" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{food.strMeal}</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <FavoriteButton foodOrDrink={ food } />
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
