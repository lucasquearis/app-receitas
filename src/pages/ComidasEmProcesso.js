import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const getIngredientsKeys = (meal) => Object.keys(meal)
  .filter((ingredient) => ingredient
    .includes('strIngredient')
      && meal[ingredient] !== null && meal[ingredient] !== '');

const getIngredientsList = (target, idApi, ingredients, food) => {
  const ingredientsKeys = getIngredientsKeys(food);
  return ingredientsKeys
    .map((ingredientKey, index) => ({
      [food[ingredientKey]]: target.name === food[ingredientKey]
        ? target.checked
        : ingredients[idApi][index][food[ingredientKey]],
    }));
};

const ComidasEmProcesso = () => {
  const [food, setFood] = useState();
  const [ingredients, setIngredients] = useState({ wereFetched: false });
  const location = useLocation();
  const idApi = location.pathname.split('/')[2];

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_FOOD}${idApi}`);
      const data = await response.json();
      const meal = data.meals[0];

      setFood(meal);

      const lastSave = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
        meals: {}, cocktails: {},
      };
      const ingredientsKeys = getIngredientsKeys(meal);
      setIngredients({
        [meal.idMeal]: ingredientsKeys.map((ingredientKey, index) => ({
          [meal[ingredientKey]]: lastSave.meals[idApi]
            ? lastSave.meals[idApi][index][meal[ingredientKey]]
            : false,
        })),
        wereFetched: true,
      });
    };
    api();
  }, []);

  const handleCheckboxChange = ({ target }) => {
    setIngredients({
      [idApi]: getIngredientsList(target, idApi, ingredients, food),
      wereFetched: true,
    });

    const lastSave = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...lastSave,
      meals: {
        ...lastSave.meals,
        [idApi]: getIngredientsList(target, idApi, ingredients, food),
      },
      cocktails: {
        ...lastSave.cocktails,
      },
    }));
  };

  const renderIngredients = (ingredientsKeys) => ingredientsKeys
    .map((ingredientKey, index) => (
      <div key={ index }>
        <label
          htmlFor={ food[ingredientKey] }
          data-testid={ `${index}-ingredient-step` }
          style={ ingredients.wereFetched
          && ingredients[idApi][index][food[ingredientKey]]
            ? { 'text-decoration': 'line-through' }
            : {} }
        >
          <input
            id={ food[ingredientKey] }
            name={ food[ingredientKey] }
            type="checkbox"
            onChange={ handleCheckboxChange }
            checked={ ingredients.wereFetched
              && ingredients[idApi][index][food[ingredientKey]] }
          />
          {` ${food[ingredientKey]} - ${food[`strMeasure${index + 1}`]}`}
        </label>
      </div>
    ));

  if (food === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <img src={ food.strMealThumb } alt="recipe" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{food.strMeal}</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <p data-testid="recipe-category">{food.strCategory}</p>
      {renderIngredients(getIngredientsKeys(food))}
      <p data-testid="instructions">{food.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
};

export default ComidasEmProcesso;
