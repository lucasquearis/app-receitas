import React from 'react';
import propTypes from 'prop-types';
import { IngredintSection, IngredientH3, IngredintLi, Div } from './styles';

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
    <IngredintSection>
      <Div>
        <IngredientH3>Ingredientes</IngredientH3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <IngredintLi
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient} - ${measures[index]}`}
            </IngredintLi>
          ))}
        </ul>
      </Div>
    </IngredintSection>
  );
}

Ingredients.propTypes = {
  recipe: propTypes.shape({
    strIngredient1: propTypes.string,
  }).isRequired,
};

export default Ingredients;
