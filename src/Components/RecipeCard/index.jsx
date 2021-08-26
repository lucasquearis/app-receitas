import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ image, name, index, testId, id }) {
  return (
    <Link to={ `/details/${id}` }>
      <div data-testid={ testId }>
        <img src={ image } alt="Recipe" data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{ name }</p>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeCard;
