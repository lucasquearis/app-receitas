import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard(props) {
  const { thumb, name, index } = props;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ thumb }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </div>
  );
}

RecipeCard.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
