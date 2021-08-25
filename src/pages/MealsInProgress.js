import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchRecipe from '../services/fetchRecipe';

function MealsInProgress() {
  const { id } = useParams();
  const [rcp, setRcp] = useState({});
  const [ingList, setIngList] = useState([]);

  useEffect(() => {
    async function getRcps() {
      const response = await fetchRecipe(id);
      console.log(response);
      const ingredients = Object.keys(response)
        .filter((e) => e.includes('strIngredient') && response[e])
        .map((e) => response[e]);

      setIngList(ingredients);
      setRcp(response);
    }
    getRcps();
  }, [id]);

  // useEffect(() => console.log(rcp, ingList), [rcp, ingList]);

  return (
    <>
      <img data-testid="recipe-photo" src={ rcp.strMealThumb } alt={ rcp.strMeal } />
      <h1 data-testid="recipe-title">{rcp.strMeal}</h1>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favoritar</button>
      <p data-testid="instructions">{rcp.strInstructions}</p>
      <h1 data-testid="recipe-category">{rcp.strCategory}</h1>
      {ingList.map((ing, index) => (
        <span key={ ing } data-testid={ `${index}-ingredient-step` }>{ing}</span>
      ))}
      <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
    </>
  );
}

export default MealsInProgress;
