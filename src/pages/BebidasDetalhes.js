import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const recommendedRecipes = [
  'receita 1',
  'receita 2',
  'receita 3',
];

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

export default function BebidasDetalhes() {
  const [drink, setDrink] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const idApi = location.pathname.split('/')[2];

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_DRINK}${idApi}`);
      const data = await response.json();
      setDrink(data.drinks[0]);
      const lastSave = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const favoriteFound = lastSave
        .find((recipe) => recipe.id === data.drinks[0].idDrink);
      if (favoriteFound) {
        setIsFavorite(Object.values(favoriteFound)[0]);
      } else {
        setIsFavorite(false);
      }
    };
    api();
  }, [idApi]);

  const renderIngredients = (ingredientsKeys) => ingredientsKeys
    .map((ingredientKey, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ index }
      >
        {`${drink[ingredientKey]}`}
      </li>));

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

      <ul>
        {renderIngredients(getIngredientsKeys(drink))}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <div>
        <h3>Receitas recomendadas</h3>
        <ul>
          {recommendedRecipes.map((name, index) => (
            <li
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/bebidas/${idApi}/in-progress`) }
      >
        Começar receita
      </button>
    </div>
  );
}
