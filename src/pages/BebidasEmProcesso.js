import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const getFavorite = (drink) => ({
  id: drink.idDrink,
  type: 'bebida',
  area: '',
  category: drink.strCategory,
  alcoholicOrNot: drink.strAlcoholic,
  name: drink.strDrink,
  image: drink.strDrinkThumb,
});

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
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredients, setIngredients] = useState({ wereFetched: false });
  const history = useHistory();
  const location = useLocation();
  const idApi = location.pathname.split('/')[2];

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_DRINK}${idApi}`);
      const data = await response.json();
      const cocktail = data.drinks[0];

      setDrink(cocktail);

      const lastSaveFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const favoriteFound = lastSaveFavorite
        .find((recipe) => recipe.id === data.drinks[0].idDrink);
      if (favoriteFound) {
        setIsFavorite(Object.values(favoriteFound)[0]);
      } else {
        setIsFavorite(false);
      }

      const ingredientsKeys = getIngredientsKeys(cocktail);
      const lastSaveProgress = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
        meals: {}, cocktails: {},
      };
      setIngredients({
        [idApi]: ingredientsKeys.map((ingredientKey, index) => ({
          [cocktail[ingredientKey]]: lastSaveProgress.cocktails[idApi]
            ? lastSaveProgress.cocktails[idApi][index][cocktail[ingredientKey]]
            : false,
        })),
        wereFetched: true,
      });
    };
    api();
  }, [idApi]);

  const handleFavorite = () => {
    const lastSave = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (lastSave.find((recipe) => recipe.id === drink.idDrink)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        lastSave.filter((recipe) => recipe.id !== drink.idDrink),
      ));
      setIsFavorite(false);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...lastSave, getFavorite(drink)],
      ));
      setIsFavorite(true);
    }
  };

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

  const allDone = () => ingredients.wereFetched && ingredients[idApi]
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

      <button
        type="button"
        onClick={ handleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt={ `Botão para adicionar ou retirar ${drink.strDrink} dos favoritos` }
        />
      </button>

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
