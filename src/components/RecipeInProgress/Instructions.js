import { objectOf, string } from 'prop-types';
import React from 'react';

function Instructions({ recipeDetails }) {
  return (
    <>
      <h5>Instructions</h5>
      <section className="instructions-container">
        <p data-testid="instructions">{ recipeDetails.strInstructions }</p>
      </section>
    </>
  );
}

Instructions.propTypes = {
  recipeDetails: objectOf(string).isRequired,
};

export default Instructions;
