import React from 'react';
import propTypes from 'prop-types';

function Checkbox({ recipe }) {
  const ingredients = [];
  const measures = [];
  const maxIngredients = 20;

  for (let index = 1; index <= maxIngredients; index += 1) {
    if (recipe[`strIngredient${index}`]) {
      ingredients.push(recipe[`strIngredient${index}`]);
    }
  }

  for (let index = 1; index <= maxIngredients; index += 1) {
    if (recipe[`strMeasure${index}`]) {
      measures.push(recipe[`strMeasure${index}`]);
    }
  }

  return (
    <section>
      <h3>Ingredientes</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-step` }>
            {`${ingredient} - ${measures[index]}`}
          </li>
        ))}
      </ul>
    </section>
  );
}

Checkbox.propTypes = {
  recipe: propTypes.shape({
    strIngredient1: propTypes.string,
  }).isRequired,
};

export default Checkbox;
