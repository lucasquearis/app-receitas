import React from 'react';
import propTypes from 'prop-types';

function Ingredients({ recipe }) {
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
      <h3 data-testid={ `${0}-ingredient-name-and-measure` }>Ingredientes</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${ingredient} - ${measures[index]}`}
          </li>
        ))}
      </ul>
    </section>
  );
}

Ingredients.propTypes = {
  recipe: propTypes.shape({
    strIngredient1: propTypes.string,
  }).isRequired,
};

export default Ingredients;
