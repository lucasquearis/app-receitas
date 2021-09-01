import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';
import { ContextApp } from '../../Context/ContextApp';

function RecipeCard({ image, name, index, testId, id, feedType }) {
  const { handleRecipe } = useContext(ContextApp);

  return (
    <div data-testid={ testId } className="container">
      <Link
        to={ `/${feedType}/${id}` }
        onClick={ () => handleRecipe({ id, feedType }) }
      >
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
