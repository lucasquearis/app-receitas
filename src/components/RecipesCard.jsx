import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ data }) {
  const max = 11;
  return (
    <div className="card-container">
      {
        data.map(({ idMeal, strMeal, strMealThumb }, index) => (
          index <= max && (
            <div
              key={ idMeal }
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <img
                src={ strMealThumb }
                alt="food"
                data-testid={ `${index}-card-img` }
                className="card-image"
              />
              <h3 data-testid={ `${index}-card-name` } className="recipe-name">
                { strMeal }
              </h3>
            </div>)))
      }
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}.isRequird;

export default Card;
