import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealRecipe } from '../services/fetchRecipe';
import { IngredientsTaskList } from '../components';
import {
  addIngInProgressStorage,
  rmvIngFromProgressStorage,
} from '../helpers/inProgressLocalStorage';

function MealsInProgress() {
  const { id } = useParams();
  const [rcp, setRcp] = useState({
    ingList: [],
  });

  useEffect(() => {
    function isInLocalStorage(ing) {
      const { meals } = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (!meals[id]) return false;
      return meals[id].some((ingredient) => ingredient === ing);
    }
    async function getRcps() {
      const response = await fetchMealRecipe(id, 'meal');
      const ingredients = Object.keys(response)
        .filter((e) => e.includes('strIngredient') && response[e])
        .map((e) => ({ ing: response[e], checked: isInLocalStorage(response[e]) }));

      setRcp({ ...response, ingList: ingredients });
    }
    getRcps();
  }, [id]);

  const handleCheckIngredient = ({ target }) => {
    const { checked, name } = target;
    const { ingList } = rcp;
    const ingredientIndex = ingList.findIndex((e) => e.ing === name);

    setRcp({
      ...rcp,
      ingList: [
        ...ingList.slice(0, ingredientIndex),
        { ing: name, checked },
        ...ingList.slice(ingredientIndex + 1),
      ],
    });

    if (checked) return addIngInProgressStorage(id, name, 'meals');
    rmvIngFromProgressStorage(id, name, 'meals');
  };

  return (
    <>
      <img data-testid="recipe-photo" src={ rcp.strMealThumb } alt={ rcp.strMeal } />
      <h1 data-testid="recipe-title">{rcp.strMeal}</h1>
      <button data-testid="share-btn" type="button">
        Compartilhar
      </button>
      <button data-testid="favorite-btn" type="button">
        Favoritar
      </button>
      <p data-testid="instructions">{rcp.strInstructions}</p>
      <h1 data-testid="recipe-category">{rcp.strCategory}</h1>
      <IngredientsTaskList
        ingList={ rcp.ingList }
        handleCheckIngredient={ handleCheckIngredient }
      />
      <button data-testid="finish-recipe-btn" type="button">
        Finalizar
      </button>
    </>
  );
}

export default MealsInProgress;
