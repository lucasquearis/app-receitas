import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

const ComidasEmProcesso = () => {
  const [food, setFood] = useState();
  const location = useLocation();
  const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  useEffect(() => {
    const api = async () => {
      const idApi = location.pathname.split('/')[2];
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
        data-testid={ `${index}-ingredient-step` }
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
      <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
};

export default ComidasEmProcesso;
