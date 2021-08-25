import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealRecipe } from '../services/fetchRecipe';
import { IngredientsTaskList } from '../components';

function MealsInProgress() {
  const { id } = useParams();
  const [rcp, setRcp] = useState({
    ingList: [],
  });

  useEffect(() => {
    async function getRcps() {
      const response = await fetchMealRecipe(id, 'meal');
      console.log(response);
      const ingredients = Object.keys(response)
        .filter((e) => e.includes('strIngredient') && response[e])
        .map((e) => response[e]);

      setRcp({ ...response, ingList: ingredients });
    }
    getRcps();
  }, [id]);

  return (
    <>
      <img data-testid="recipe-photo" src={ rcp.strMealThumb } alt={ rcp.strMeal } />
      <h1 data-testid="recipe-title">{rcp.strMeal}</h1>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>
      <p data-testid="instructions">{rcp.strInstructions}</p>
      <h1 data-testid="recipe-category">{rcp.strCategory}</h1>
      <IngredientsTaskList ingList={ rcp.ingList } />
      <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
    </>
  );
}

export default MealsInProgress;
