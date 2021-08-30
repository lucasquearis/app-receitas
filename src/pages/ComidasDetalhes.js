import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ComidasDetalhes.css';
import Loading from '../components/Loading';

export default function ComidasDetalhes() {
  const [food, setFood] = useState();
  const [recomendedDrink, setRecoomendedDrink] = useState([]);
  const location = useLocation();
  const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  useEffect(() => {
    const api = async () => {
      const idApi = location.pathname.split('/')[2];
      const response = await fetch(`${URL_FOOD}${idApi}`);
      const data = await response.json();
      // console.log(data);
      setFood(data.meals[0]);
    };
    api();
  }, []);

  useEffect(() => {
    const apiDrink = async () => {
      const magicalNumber = 6;
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const data = await fetch(URL).then((response) => response.json());
      const firstSix = await data.drinks.slice(0, magicalNumber);
      setRecoomendedDrink(firstSix);
    };
    apiDrink();
  }, []);

  if (food === undefined) {
    return <Loading />;
  }

  const setIngredients = () => {
    const ingredients1 = Object.keys(food)
      .filter((ingridient) => ingridient
        .includes('strIngredient')
        && food[ingridient] !== null && food[ingridient] !== '');
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
        src={ food.strYoutube }
        title="Vídeo de Instrução"
        data-testid="video"
      />
      {recomendedDrink.map((recomendation, index) => (
        <div
          data-testid={ `${index}-recomendation-card` }
          key={ index }
        >
          <ul>
            <li
              className={ index <= 1 ? '' : 'displayNone' }
              data-testid={ `${index}-recomendation-title` }
            >
              { recomendation.strDrink }
            </li>
          </ul>
        </div>
      ))}
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}
