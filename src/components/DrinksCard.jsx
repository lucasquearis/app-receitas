import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ data }) {
  const max = 11;
  return (
    <div className="card-container">
      {
        data.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          index <= max && (
            <div
              key={ idDrink }
              data-testid={ `${index}-recipe-card` }
              className="card"
            >
              <img
                src={ strDrinkThumb }
                alt="food"
                data-testid={ `${index}-card-img` }
                className="card-image"
              />
              <h3 data-testid={ `${index}-card-name` } className="recipe-name">
                { strDrink }
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
