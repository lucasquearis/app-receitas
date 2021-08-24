import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ name, thumb, id }) {
  return (
    <div className="meal" data-testid="recipe-card">
      <img src={ thumb } alt={ name } data-testid={ `${id}-card-img` } />
      <h2>{name}</h2>
    </div>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
