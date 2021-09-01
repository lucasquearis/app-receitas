import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import Loading from '../components/Loading';

const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const getIngredientsKeys = (meal) => Object.keys(meal)
  .filter((ingredient) => ingredient
    .includes('strIngredient')
      && meal[ingredient] !== null && meal[ingredient] !== '');

const getIngredientsList = (target, idURL, ingredients, food) => {
  const ingredientsKeys = getIngredientsKeys(food);
  return ingredientsKeys
    .map((ingredientKey, index) => ({
      [food[ingredientKey]]: target.name === food[ingredientKey]
        ? target.checked
        : ingredients[idURL][index][food[ingredientKey]],
    }));
};

const saveProgress = (target, idURL, ingredients, food) => {
  const lastSave = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    ...lastSave,
    meals: {
      ...lastSave.meals,
      [idURL]: getIngredientsList(target, idURL, ingredients, food),
    },
    cocktails: {
      ...lastSave.cocktails,
    },
  }));
};

const buildIngredients = (meal, idURL) => {
  const lastSaveProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    meals: {}, cocktails: {},
  };
  const ingredientsKeys = getIngredientsKeys(meal);
  return {
    [meal.idMeal]: ingredientsKeys.map((ingredientKey, index) => ({
      [meal[ingredientKey]]: lastSaveProgress.meals[idURL]
        ? lastSaveProgress.meals[idURL][index][meal[ingredientKey]]
        : false,
    })),
    wereFetched: true,
  };
};

const getIdFromURL = (location) => location.pathname.split('/')[2];

const ComidasEmProcesso = () => {
  const [food, setFood] = useState();
  const [ingredients, setIngredients] = useState({ wereFetched: false });
  const history = useHistory();
  const location = useLocation();
  const idURL = getIdFromURL(location);

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_FOOD}${idURL}`);
      const data = await response.json();
      const meal = data.meals[0];
      setFood(meal);
      setIngredients(buildIngredients(meal, idURL));
    };
    api();
  }, [idURL]);

  const handleCheckboxChange = ({ target }) => {
    setIngredients({
      [idURL]: getIngredientsList(target, idURL, ingredients, food),
      wereFetched: true,
    });
    saveProgress(target, idURL, ingredients, food);
  };

  const renderIngredients = (ingredientsKeys) => ingredientsKeys
    .map((ingredientKey, index) => (
      <div key={ index }>
        <label
          htmlFor={ food[ingredientKey] }
          data-testid={ `${index}-ingredient-step` }
          style={ ingredients.wereFetched
          && ingredients[idURL][index][food[ingredientKey]]
            ? { 'text-decoration': 'line-through' }
            : {} }
        >
          <input
            id={ food[ingredientKey] }
            name={ food[ingredientKey] }
            type="checkbox"
            onChange={ handleCheckboxChange }
            checked={ ingredients.wereFetched
              && ingredients[idURL][index][food[ingredientKey]] }
          />
          {` ${food[ingredientKey]} - ${food[`strMeasure${index + 1}`]}`}
        </label>
      </div>
    ));

  const allDone = () => ingredients.wereFetched && ingredients[idURL]
    .every((ingredient) => Object.values(ingredient)[0] === true);

  if (food === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <img src={ food.strMealThumb } alt="recipe" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{food.strMeal}</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>

      <FavoriteButton foodOrDrink={ food } />

      <p data-testid="recipe-category">{food.strCategory}</p>
      {renderIngredients(getIngredientsKeys(food))}
      <p data-testid="instructions">{food.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !allDone() }
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </div>
  );
};

export default ComidasEmProcesso;
