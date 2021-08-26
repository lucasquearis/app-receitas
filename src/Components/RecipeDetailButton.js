import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function RecipeDetailButton({ recipeID }) {
  return (
    <div className="recipeButtonContainer">
      {console.log(recipeID)}
      <Button variant="success">Iniciar Receita</Button>
    </div>
  );
}

RecipeDetailButton.propTypes = {
  recipeID: PropTypes.string.isRequired,
};

export default RecipeDetailButton;
