import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const getIngredientsKeys = (cocktail) => Object.keys(cocktail)
  .filter((ingredient) => ingredient
    .includes('strIngredient')
      && cocktail[ingredient] !== null && cocktail[ingredient] !== '');

const getIngredientsList = (target, idApi, ingredients, drink) => {
  const ingredientsKeys = getIngredientsKeys(drink);
  return ingredientsKeys
    .map((ingredientKey, index) => ({
      [drink[ingredientKey]]: target.name === drink[ingredientKey]
        ? target.checked
        : ingredients[idApi][index][drink[ingredientKey]],
    }));
};

const BebidasEmProcesso = () => {
  const [drink, setDrink] = useState();
  const [ingredients, setIngredients] = useState({ wereFetched: false });
  const location = useLocation();
  const idApi = location.pathname.split('/')[2];

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_DRINK}${idApi}`);
      const data = await response.json();
      const cocktail = data.drinks[0];
      setDrink(cocktail);
      const ingredientsKeys = getIngredientsKeys(cocktail);
      const lastSave = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
        meals: {}, cocktails: {},
      };
      setIngredients({
        [idApi]: ingredientsKeys.map((ingredientKey, index) => ({
          [cocktail[ingredientKey]]: lastSave.cocktails[idApi]
            ? lastSave.cocktails[idApi][index][cocktail[ingredientKey]]
            : false,
        })),
        wereFetched: true,
      });
    };
    api();
  }, []);

  const handleCheckboxChange = ({ target }) => {
    setIngredients({
      [idApi]: getIngredientsList(target, idApi, ingredients, drink),
      wereFetched: true,
    });
    const lastSave = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...lastSave,
      cocktails: {
        ...lastSave.cocktails,
        [idApi]: getIngredientsList(target, idApi, ingredients, drink),
      },
      meals: {
        ...lastSave.meals,
      },
    }));
  };

  const renderIngredients = (ingredientsKeys) => ingredientsKeys
    .map((ingredientKey, index) => (
      <div key={ index }>
        <label
          htmlFor={ drink[ingredientKey] }
          data-testid={ `${index}-ingredient-step` }
          style={ ingredients.wereFetched
          && ingredients[idApi][index][drink[ingredientKey]]
            ? { 'text-decoration': 'line-through' }
            : {} }
        >
          <input
            id={ drink[ingredientKey] }
            name={ drink[ingredientKey] }
            type="checkbox"
            onChange={ handleCheckboxChange }
            checked={ ingredients.wereFetched
              && ingredients[idApi][index][drink[ingredientKey]] }
          />
          {` ${drink[ingredientKey]}`}
        </label>
      </div>
    ));

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
      <button type="button" data-testid="favorite-btn">Favorito</button>
      {renderIngredients(getIngredientsKeys(drink))}
      <p data-testid="instructions">{drink.strInstructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
};

export default BebidasEmProcesso;
