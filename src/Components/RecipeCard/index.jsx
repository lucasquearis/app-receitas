import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import './style.css';

function RecipeCard({ image, name, index, testId, id }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const currentRout = pathname.includes('/comidas');
  return (
    <Link to={ currentRout ? `/comidas/${id}` : `/bebidas/${id}` }>
      <div data-testid={ testId } className="container">
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
