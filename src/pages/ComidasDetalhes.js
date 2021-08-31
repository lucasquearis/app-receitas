import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';

const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const recommendedRecipes = [
  'receita 1',
  'receita 2',
  'receita 3',
];

const getIngredientsKeys = (meal) => Object.keys(meal)
  .filter((ingredient) => ingredient
    .includes('strIngredient')
      && meal[ingredient] !== null && meal[ingredient] !== '');

export default function ComidasDetalhes() {
  const [food, setFood] = useState();
  const history = useHistory();
  const location = useLocation();
  const idApi = location.pathname.split('/')[2];

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_FOOD}${idApi}`);
      const data = await response.json();
      setFood(data.meals[0]);
    };
    api();
  }, []);

  if (food === undefined) {
    return <Loading />;
  }

  const renderIngredients = (ingredientsKeys) => ingredientsKeys
    .map((ingredientKey, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ index }
      >
        {`${food[ingredientKey]} - ${food[`strMeasure${index + 1}`]}`}
      </li>));

  return (
    <div>
      <img src={ food.strMealThumb } alt="recipe" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{food.strMeal}</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <p data-testid="recipe-category">{food.strCategory}</p>
      <ul>
        {renderIngredients(getIngredientsKeys(food))}
      </ul>
      <p data-testid="instructions">{food.strInstructions}</p>
      <iframe
        src="https://www.youtube.com/embed/DsFpGUXpZVU"
        title="Vídeo de Instrução"
        data-testid="video"
      />
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
        onClick={ () => history.push(`/comidas/${idApi}/in-progress`) }
      >
        Começar receita
      </button>
    </div>
  );
}
