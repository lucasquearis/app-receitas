import { func } from 'prop-types';
import React from 'react';

function Ingredients({ renderIngredientList }) {
  return (
    <>
      <h5 style={ { margin: '15px 0' } }>Ingredients</h5>
      <ul className="list-ingredient">{ renderIngredientList() }</ul>
    </>
  );
}

Ingredients.propTypes = {
  renderIngredientList: func.isRequired,
};
export default Ingredients;
