import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function RecipeCard(props) {
  const { thumb, name, index } = props;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        className="card-image"
        src={ thumb }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <h3 data-testid={ `${index}-card-name` } className="recipe-name">{ name }</h3>
    </div>
  );
}

RecipeCard.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
