import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinkRecipe } from '../services/fetchRecipe';
import { IngredientsTaskList } from '../components';

function DrinksInProgress() {
  const { id } = useParams();
  const [rcp, setRcp] = useState({
    ingList: [],
  });

  useEffect(() => {
    async function getRcps() {
      const response = await fetchDrinkRecipe(id);
      const ingredients = Object.keys(response)
        .filter((e) => e.includes('strIngredient') && response[e])
        .map((e) => response[e]);

      setRcp({ ...response, ingList: ingredients });
    }
    getRcps();
  }, [id]);

  return (
    <>
      <img data-testid="recipe-photo" src={ rcp.strDrinkThumb } alt={ rcp.strDrink } />
      <h1 data-testid="recipe-title">{rcp.strDrink}</h1>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>
      <p data-testid="instructions">{rcp.strInstructions}</p>
      <h1 data-testid="recipe-category">{rcp.strAlcoholic}</h1>
      <IngredientsTaskList ingList={ rcp.ingList } />
      <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
    </>
  );
}

export default DrinksInProgress;
