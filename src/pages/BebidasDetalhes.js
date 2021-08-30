import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

export default function BebidasDetalhes() {
  const [drink, setDrink] = useState();
  const [recomendedFood, setRecoomendedFood] = useState([]);
  const location = useLocation();
  const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  useEffect(() => {
    const api = async () => {
      const idApi = location.pathname.split('/')[2];
      const response = await fetch(`${URL_DRINK}${idApi}`);
      const data = await response.json();
      setDrink(data.drinks[0]);
    };
    api();
  }, []);

  useEffect(() => {
    const apiFood = async () => {
      const magicalNumber = 6;
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const data = await fetch(URL).then((response) => response.json());
      const firstSix = await data.meals.slice(0, magicalNumber);
      setRecoomendedFood(firstSix);
    };
    apiFood();
  }, []);

  if (drink === undefined) {
    return <Loading />;
  }

  const setIngredients = () => {
    const ingredients1 = Object.keys(drink)
      .filter((ingridient) => ingridient
        .includes('strIngredient')
        && drink[ingridient] !== null && drink[ingridient] !== '');
    // console.log(ingredients1);
    return ingredients1.map((jonas, index) => (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ index }
      >
        {drink[jonas]}
        -
        {drink[`strMeasure${index + 1}`]}
      </li>));
  };

  setIngredients();
  return (
    <div>
      <p>{drink.idDrink}</p>
      <img src={ drink.strDrinkThumb } alt="recipe" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{drink.strDrink}</h2>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <p data-testid="recipe-category">{drink.strAlcoholic}</p>
      <ul>
        {setIngredients()}
      </ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      {recomendedFood.map((recomendation, index) => (
        <div
          data-testid={ `${index}-recomendation-card` }
          key={ index }
        >
          <ul>
            <li
              className={ index <= 1 ? '' : 'displayNone' }
              data-testid={ `${index}-recomendation-title` }
            >
              { recomendation.strMeal }
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
