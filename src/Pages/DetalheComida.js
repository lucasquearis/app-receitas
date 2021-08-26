import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './DetalheComida.css';
import * as ComidasAPI from '../service/ComidasAPI';
import * as BebidasAPI from '../service/BebidasAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DetalheComida(props) {
  const { match: { params: { id } } } = props;

  const [food, setFood] = useState({});
  const [randomDrinks, setRandomDrinks] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFood = async () => {
      const foodResult = await ComidasAPI.buscarComidaPeloID(id);
      setFood(foodResult[0]);

      const ingredientsKeys = Object.entries(foodResult[0]).filter((ingredient) => (
        ingredient[0].includes('strIngredient')
      ));

      const ingredientsMeasure = Object.entries(foodResult[0]).filter((measureAll) => (
        measureAll[0].includes('strMeasure')
      ));

      const ingredients = ingredientsKeys.filter((key) => (
        key[1] !== '' && key[1] !== null
      ));

      const measure = ingredientsMeasure.filter((currMeasure) => (
        currMeasure[1] !== '' && currMeasure[1] !== null
      ));

      const readyIngredients = ingredients.map((ingredient, index) => (
        `- ${ingredient[1]} - ${measure[index][1]}`
      ));
      setFoodIngredients(readyIngredients);
      setLoading(false);
    };

    const getRandomDrink = async () => {
      const drink1 = await BebidasAPI.buscarBebidaAleatoria();
      const drink2 = await BebidasAPI.buscarBebidaAleatoria();

      const drinks = [drink1.drinks[0], drink2.drinks[0]];
      setRandomDrinks(drinks);
    };

    getFood();
    getRandomDrink();
  }, [id]);

  if (loading) {
    return (
      <h1>Loading...</h1>
    );
  }

  const getEmbedURL = () => {
    const url = food.strYoutube;
    const minIndex = 24;
    const maxIndex = 31;
    let embededURL = '';
    if (url.length !== 0) {
      const splitedURL = url.split('');
      splitedURL.forEach((word, index) => {
        if (index === minIndex) {
          embededURL += 'embed/';
        }
        if (index < minIndex || index > maxIndex) {
          embededURL += word;
        }
      });
    }
    return embededURL;
  };
  console.log(randomDrinks);
  const randomDrinkCard = () => (
    <section className="recomended">
      <h5>Recomendadas</h5>
      <div className="recomended-section-infos">
        { randomDrinks.map((drink, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            className="recomended-info"
            key={ drink.idDrink }
          >
            <img src={ drink.strDrinkThumb } alt="foto da bebida" />
            <p>{ drink.strCategory }</p>
            <h5>{ drink.strDrink }</h5>
          </div>
        )) }
      </div>
    </section>
  );

  return (
    <section className="food-info">
      <img
        className="food-image"
        data-testid="recipe-photo"
        src={ food.strMealThumb }
        alt="foto da comida"
      />
      <div className="title-info">
        <h4 data-testid="recipe-title">{ food.strMeal }</h4>
        <div className="share-favorite-section">
          <img
            data-testid="share-btn"
            className="share-icon"
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
      <p className="food-category" data-testid="recipe-category">{ food.strCategory }</p>
      <div className="ingredients-section">
        <h5>Ingredients</h5>
        <ul>
          {
            foodIngredients.map((ingredient, index) => (
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
      <div className="instructions-section">
        <h5>Instructions</h5>
        <p data-testid="instructions">{ food.strInstructions }</p>
      </div>
      <div className="video-section">
        <h5>Video</h5>
        <iframe data-testid="video" title="food-video" src={ getEmbedURL() } />
      </div>
      { randomDrinkCard() }
      <button
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
    </section>
  );
}

DetalheComida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
