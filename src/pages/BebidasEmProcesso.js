import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import Loading from '../components/Loading';

const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const getIngredientsKeys = (cocktail) => Object.keys(cocktail)
  .filter((ingredient) => ingredient
    .includes('strIngredient')
      && cocktail[ingredient] !== null && cocktail[ingredient] !== '');

const getIngredientsList = (target, idURL, ingredients, drink) => {
  const ingredientsKeys = getIngredientsKeys(drink);
  return ingredientsKeys
    .map((ingredientKey, index) => ({
      [drink[ingredientKey]]: target.name === drink[ingredientKey]
        ? target.checked
        : ingredients[idURL][index][drink[ingredientKey]],
    }));
};

const saveProgress = (target, idURL, ingredients, drink) => {
  const lastSave = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    ...lastSave,
    cocktails: {
      ...lastSave.cocktails,
      [idURL]: getIngredientsList(target, idURL, ingredients, drink),
    },
    meals: {
      ...lastSave.meals,
    },
  }));
};

const buildIngredients = (cocktail, idURL) => {
  const ingredientsKeys = getIngredientsKeys(cocktail);
  const lastSaveProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
    meals: {}, cocktails: {},
  };
  return {
    [idURL]: ingredientsKeys.map((ingredientKey, index) => ({
      [cocktail[ingredientKey]]: lastSaveProgress.cocktails[idURL]
        ? lastSaveProgress.cocktails[idURL][index][cocktail[ingredientKey]]
        : false,
    })),
    wereFetched: true,
  };
};

const getIdFromURL = (location) => location.pathname.split('/')[2];

const BebidasEmProcesso = () => {
  const [drink, setDrink] = useState();
  const [ingredients, setIngredients] = useState({ wereFetched: false });
  const history = useHistory();
  const location = useLocation();
  const idURL = getIdFromURL(location);

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_DRINK}${idURL}`);
      const data = await response.json();
      const cocktail = data.drinks[0];
      setDrink(cocktail);
      setIngredients(buildIngredients(cocktail, idURL));
    };
    api();
  }, [idURL]);

  const handleCheckboxChange = ({ target }) => {
    setIngredients({
      [idURL]: getIngredientsList(target, idURL, ingredients, drink),
      wereFetched: true,
    });
    saveProgress(target, idURL, ingredients, drink);
  };

  const renderIngredients = (ingredientsKeys) => ingredientsKeys
    .map((ingredientKey, index) => (
      <div key={ index }>
        <label
          htmlFor={ drink[ingredientKey] }
          data-testid={ `${index}-ingredient-step` }
          style={ ingredients.wereFetched
          && ingredients[idURL][index][drink[ingredientKey]]
            ? { 'text-decoration': 'line-through' }
            : {} }
        >
          <input
            id={ drink[ingredientKey] }
            name={ drink[ingredientKey] }
            type="checkbox"
            onChange={ handleCheckboxChange }
            checked={ ingredients.wereFetched
              && ingredients[idURL][index][drink[ingredientKey]] }
          />
          {` ${drink[ingredientKey]} - ${drink[`strMeasure${index + 1}`]}`}
        </label>
      </div>
    ));

  const allDone = () => ingredients.wereFetched && ingredients[idURL]
    .every((ingredient) => Object.values(ingredient)[0] === true);

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

      {renderIngredients(getIngredientsKeys(drink))}
      <p data-testid="instructions">{drink.strInstructions}</p>
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

export default BebidasEmProcesso;
