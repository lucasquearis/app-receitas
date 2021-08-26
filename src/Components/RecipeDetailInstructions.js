import React from 'react';
import PropTypes from 'prop-types';

import './RecipeDetailInstructions.css';

function RecipeDetailInstructions({ recipe }) {
  return (
    <div className="instructionsContainer">
      <h3>Instructions</h3>
      <p data-testid="instructions">
        {recipe.strInstructions}
      </p>
    </div>
  );
}

RecipeDetailInstructions.propTypes = {
  recipe: PropTypes.shape({
    strInstructions: PropTypes.string,
  }).isRequired,
};

export default RecipeDetailInstructions;
