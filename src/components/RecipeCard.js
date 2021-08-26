import React from 'react';
import PropTypes from 'prop-types';
import '../styles/recipeCard.css';

export default function RecipeCard({ id, name, img, aux, index, testId, setIdDetails }) {
  return (
    <button
      type="button"
      className="recipe-card"
      data-testid={ `${index}-${testId}` }
      onClick={ () => { setIdDetails(id); } }
    >
      <img src={ img } alt={ name } data-testid={ `${index}-card-img` } />
      <div>
        { aux && <span>{ aux }</span> }
        <span data-testid={ `${index}-card-name` }>{ name }</span>
      </div>
    </button>
  );
}

RecipeCard.defaultProps = {
  aux: null,
};

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  aux: PropTypes.string,
  index: PropTypes.number.isRequired,
  testId: PropTypes.string.isRequired,
  setIdDetails: PropTypes.func.isRequired,
};
