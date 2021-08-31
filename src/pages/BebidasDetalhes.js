import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const recommendedRecipes = [
  'receita 1',
  'receita 2',
  'receita 3',
];

const getIngredientsKeys = (cocktail) => Object.keys(cocktail)
  .filter((ingredient) => ingredient
    .includes('strIngredient')
&& cocktail[ingredient] !== null && cocktail[ingredient] !== '');

export default function BebidasDetalhes() {
  const [drink, setDrink] = useState();
  const history = useHistory();
  const location = useLocation();
  const idApi = location.pathname.split('/')[2];

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_DRINK}${idApi}`);
      const data = await response.json();
      setDrink(data.drinks[0]);
    };
    api();
  }, []);

  const renderIngredients = (ingredientsKeys) => ingredientsKeys
    .map((ingredientKey, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ index }
      >
        {`${drink[ingredientKey]}`}
      </li>));

  if (drink === undefined) {
    return <Loading />;
  }

  return (
    <div>
      {/* <p>{drink.idDrink}</p> */}
      <img src={ drink.strDrinkThumb } alt="recipe" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <div data-testid="recipe-category">{drink.strCategory}</div>
      <div data-testid="recipe-glass">{drink.strGlass}</div>
      <div data-testid="recipe-alcoholic">{drink.strAlcoholic}</div>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
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
