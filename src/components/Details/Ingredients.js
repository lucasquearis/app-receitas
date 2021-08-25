import React from 'react';
import { objectOf } from 'prop-types';

export default function Ingredients(props) {
  const max = 20;
  const ingredients = [];
  for (let index = 1; index <= max; index += 1) {
    if (props.data[`strIngredient${index}`]) {
      ingredients.push(props.data[`strIngredient${index}`]);
    }
  }
  return (
    <div>
      <h2>Ingredients</h2>
      {
        ingredients.map((ingredient, index) => (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { ingredient }
          </li>
        ))
      }
    </div>
  );
}

Ingredients.propTypes = {
  data: objectOf.isRequired,
};
