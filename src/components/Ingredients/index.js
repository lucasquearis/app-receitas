import React from 'react';
import { arrayOf, shape, string } from 'prop-types';

const Ingredients = ({ ingredients }) => (
  <ul className="ingredients">
    { ingredients.map((ingredient, index) => (
      <li
        key={ `ingredient-${index}` }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        { `${ingredient.measure} of ${ingredient.name}` }
      </li>)) }
  </ul>
);

Ingredients.propTypes = {
  ingredients: arrayOf(shape({ name: string, measure: string })).isRequired,
};

export default Ingredients;
