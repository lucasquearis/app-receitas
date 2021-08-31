import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import './style.css';

function RecipeCard({ image, name, index, testId, id, feedType }) {
  return (
    <div data-testid={ testId } className="container">
      <Link to={ `/${feedType}/${id}` }>
        <img src={ image } alt="Recipe" data-testid={ `${index}-card-img` } />
        <p
          data-testid={ testId === `${index}-recomendation-card`
            ? `${index}-recomendation-title` : `${index}-card-name` }
        >
          { name }
        </p>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  feedType: PropTypes.string.isRequired,

};

export default RecipeCard;
