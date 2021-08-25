import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './DetalheComida.css';
import * as ComidasAPI from '../service/ComidasAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function DetalheComida(/* props */) {
  // const { match: { params: { id } } } = props;

  const [food, setFood] = useState({});
  const [foodIngredients, setFoodIngredients] = useState([]);

  useEffect(() => {
    const getFood = async () => {
      const testID = '52772';
      const foodResult = await ComidasAPI.buscarComidaPeloID(testID);
      setFood(foodResult[0]);

      const ingredientsKeys = Object.entries(foodResult[0]).filter((ingredient) => (
        ingredient[0].includes('strIngredient')
      ));
      const ingredients = ingredientsKeys.filter((key) => (
        key[1] !== '' && key[1] !== null
      ));
      setFoodIngredients(ingredients);
    };

    getFood();
  }, []);
  console.log(food);
  console.log(foodIngredients);
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
        <h5>Ingredientes</h5>
        <ul>
          {
            foodIngredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient[1] }
              >
                { `- ${ingredient[1]}` }
              </li>
            ))
          }
        </ul>
      </div>
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
