import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const recommendedRecipes = [
  'receita 1',
  'receita 2',
  'receita 3',
];

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

export default function ComidasDetalhes() {
  const [food, setFood] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const idApi = location.pathname.split('/')[2];

  useEffect(() => {
    const api = async () => {
      const response = await fetch(`${URL_FOOD}${idApi}`);
      const data = await response.json();
      setFood(data.meals[0]);
      const lastSave = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const favoriteFound = lastSave
        .find((recipe) => recipe.id === data.meals[0].idMeal);
      if (favoriteFound) {
        setIsFavorite(Object.values(favoriteFound)[0]);
      } else {
        setIsFavorite(false);
      }
    };
    console.log('oi');
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
