import React from 'react';
import PropTypes from 'prop-types';
import './css/Recomendations.css';

const Recomendations = ({ recomendations, isMeal, isDrink }) => {
  const mealCards = () => (
    recomendations.map((meal, index) => (
      <div
        className="recipe-card"
        key={ index }
        data-testid={ `${index}-recomendation-card` }
      >
        <div
          className="card-image"
          style={ { backgroundImage: `url(${meal.strMealThumb})` } }
        />
        <div
          className="card-info"
        >
          <p>{meal.strCategory}</p>
          <h4
            data-testid={ `${index}-recomendation-title` }
          >
            {meal.strMeal}
          </h4>
        </div>
      </div>
    ))
  );

  const drinkCards = () => (
    recomendations.map((drink, index) => (
      <div
        className="recipe-card"
        key={ index }
        data-testid={ `${index}-recomendation-card` }
      >
        <div
          className="card-image"
          style={ { backgroundImage: `url(${drink.strDrinkThumb})` } }
        />
        <div
          className="card-info"
        >
          <p>{drink.strAlcoholic}</p>
          <h4
            data-testid={ `${index}-recomendation-title` }
          >
            {drink.strDrink}
          </h4>
        </div>
      </div>
    ))
  );

  return (
    <section className="recomendations-container">
      <h3>Recomendations</h3>
      <div className="recomendations-cards">
        { (isMeal) && mealCards() }
        { (isDrink) && drinkCards() }
      </div>
    </section>
  );
};

Recomendations.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.object),
  isMeal: PropTypes.bool,
  isDrink: PropTypes.bool,
};

Recomendations.defaultProps = {
  recomendations: [],
  isMeal: false,
  isDrink: false,
};

export default Recomendations;
