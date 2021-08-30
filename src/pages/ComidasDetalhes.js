import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';

export default function ComidasDetalhes() {
  const [food, setFood] = useState();
  // const [foodName, setFoodName] = useState('');
  const history = useHistory();
  const location = useLocation();
  const idApi = location.pathname.split('/')[2];
  const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  const recommendedRecipes = [
    'receita 1',
    'receita 2',
    'receita 3',
  ];

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

  const setIngredients = () => {
    const ingredients1 = Object.keys(food)
      .filter((ingredient) => ingredient
        .includes('strIngredient')
        && food[ingredient] !== null && food[ingredient] !== '');
    return ingredients1.map((jonas, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ index }
      >
        {food[jonas]}
        -
        {food[`strMeasure${index + 1}`]}
      </li>));
  };

  return (
    <div>
      <img src={ food.strMealThumb } alt="recipe" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{food.strMeal}</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <p data-testid="recipe-category">{food.strCategory}</p>
      <ul>
        {setIngredients()}
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
