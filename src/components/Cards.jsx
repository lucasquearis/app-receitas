import PropTypes from 'prop-types';
import React from 'react';
import '../styles/Cards.css';

import { Link } from 'react-router-dom';

function Cards({ element, index, type }) {
  return (
    <Link
      to={
        type === 'Meal' ? `/comidas/${element.idMeal}` : `/bebidas/${element.idDrink}`
      }
    >
      <section className="card" data-testid={ `${index}-recipe-card` }>
        <img
          src={ type === 'Meal' ? element.strMealThumb : element.strDrinkThumb }
          data-testid={ `${index}-card-img` }
          alt="Thumbnail"
          width="99%"
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          { type === 'Meal' ? element.strMeal : element.strDrink }
        </p>
      </section>
    </Link>
  );
}

Cards.propTypes = {
  element: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Cards;
