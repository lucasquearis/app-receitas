import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './DetalheBebida.css';
import * as BebidasAPI from '../service/BebidasAPI';
import { buscarComidaAleatoria } from '../service/ComidasAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DetalheBebida(props) {
  const { match: { params: { id } } } = props;

  const [drink, setDrink] = useState({});
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [randomFood, setRamdomFood] = useState([]);

  useEffect(() => {
    const getDrink = async () => {
      const drinkResult = await BebidasAPI.buscarBebidaPeloID(id);
      setDrink(drinkResult.drinks[0]);

      const ingredientsKeys = Object.entries(
        drinkResult.drinks[0],
      ).filter((ingredient) => (
        ingredient[0].includes('strIngredient')
      ));

      const ingredientsMeasure = Object.entries(
        drinkResult.drinks[0],
      ).filter((measureAll) => (
        measureAll[0].includes('strMeasure')
      ));

      const ingredients = ingredientsKeys.filter((key) => (
        key[1] !== '' && key[1] !== null
      ));

      const measure = ingredientsMeasure.filter((currMeasure) => (
        currMeasure[1] !== '' && currMeasure[1] !== null
      ));

      const readyIngredients = ingredients.map((ingredient, index) => {
        if (index <= measure.length - 1) {
          const currMeasure = measure[index][1];
          return `- ${ingredient[1]} - ${currMeasure}`;
        }
        return `- ${ingredient[1]}`;
      });

      setDrinkIngredients(readyIngredients);
    };

    const getRandomFood = async () => {
      const food1 = await buscarComidaAleatoria();
      const food2 = await buscarComidaAleatoria();

      const foods = [food1[0], food2[0]];
      setRamdomFood(foods);
    };

    getDrink();
    getRandomFood();
  }, [id]);

  const randomFoodCard = () => (
    <section className="food-recomended">
      <h5>Recomendadas</h5>
      <div className="recomended-food-section-infos">
        { randomFood.map((food, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            className="recomended-food-info"
            key={ food.idMeal }
          >
            <img src={ food.strMealThumb } alt="foto da bebida" />
            <p>{ food.strCategory }</p>
            <h5>{ food.strMeal }</h5>
          </div>
        )) }
      </div>
    </section>
  );

  return (
    <section className="food-info">
      <img
        className="food-drink-image"
        data-testid="recipe-photo"
        src={ drink.strDrinkThumb }
        alt="foto da comida"
      />
      <div className="title-drink-info">
        <h4 data-testid="recipe-title">{ drink.strDrink }</h4>
        <div className="share-favorite-drink-section">
          <img
            data-testid="share-btn"
            className="share-drink-icon"
            src={ shareIcon }
            alt="icone de compartilhar"
          />
          <img
            data-testid="favorite-btn"
            src={ whiteHeartIcon }
            alt="icone de favoritar"
          />
        </div>
      </div>
      <p
        className="food-drink-category"
        data-testid="recipe-category"
      >
        { drink.strCategory }
      </p>
      <div className="ingredients-drink-section">
        <h5>Ingredients</h5>
        <ul>
          {
            drinkIngredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ `${index}` }
              >
                { ingredient }
              </li>
            ))
          }
        </ul>
      </div>
      <div className="instructions-drink-section">
        <h5>Instructions</h5>
        <p data-testid="instructions">{ drink.strInstructions }</p>
      </div>
      { randomFoodCard() }
      <button
        className="start-drink-recipe-btn"
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
    </section>
  );
}

DetalheBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
