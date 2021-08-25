import PropTypes from 'prop-types';
import React from 'react';

function Cards({ element, index, type }) {
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <img
        src={ type === 'comidas' ? element.strMealThumb : element.strDrinkThumb }
        data-testid={ `${index}-card-img` }
        alt="Thumbnail"
        width="130"
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        { type === 'comidas' ? element.strMeal : element.strDrink }
      </p>
    </section>
  );
}

Cards.propTypes = {
  element: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Cards;
