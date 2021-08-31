import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const getFavorite = (food) => ({
  id: food.idMeal,
  type: 'comida',
  area: food.strArea,
  category: food.strCategory,
  alcoholicOrNot: '',
  name: food.strMeal,
  image: food.strMealThumb,
});

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredients, setIngredients] = useState({ wereFetched: false });
  const history = useHistory();
  const location = useLocation();
  const idApi = location.pathname.split('/')[2];

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_FOOD}${idApi}`);
      const data = await response.json();
      const meal = data.meals[0];

      setFood(meal);

      const lastSaveFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const favoriteFound = lastSaveFavorite
        .find((recipe) => recipe.id === data.meals[0].idMeal);
      if (favoriteFound) {
        setIsFavorite(Object.values(favoriteFound)[0]);
      } else {
        setIsFavorite(false);
      }

      const lastSaveProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
        meals: {}, cocktails: {},
      };
      const ingredientsKeys = getIngredientsKeys(meal);
      setIngredients({
        [meal.idMeal]: ingredientsKeys.map((ingredientKey, index) => ({
          [meal[ingredientKey]]: lastSaveProgress.meals[idApi]
            ? lastSaveProgress.meals[idApi][index][meal[ingredientKey]]
            : false,
        })),
        wereFetched: true,
      });
    };
    api();
  }, [idApi]);

  const handleFavorite = () => {
    const lastSave = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (lastSave.find((recipe) => recipe.id === food.idMeal)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        lastSave.filter((recipe) => recipe.id !== food.idMeal),
      ));
      setIsFavorite(false);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...lastSave, getFavorite(food)],
      ));
      setIsFavorite(true);
    }
  };

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

  const allDone = () => ingredients.wereFetched && ingredients[idApi]
    .every((ingredient) => Object.values(ingredient)[0] === true);

  if (food === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <img src={ food.strMealThumb } alt="recipe" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{food.strMeal}</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>

      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt={ `Botão para adicionar ou retirar ${food.strMeal} dos favoritos` }
        />
      </button>

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
