import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList({ recipe }) {
  return (
    <ul>
      {
        Object.entries(recipe)
          .filter((entry) => entry[0].includes('Ingredient') && entry[1])
          .map((_ingredient, ind) => {
            const i = ind + 1;
            return (
              <li
                data-testid={ `${ind}-ingredient-name-and-measure` }
                key={ ind }
              >
                { `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}` }
              </li>
            );
          })
      }
    </ul>
  );
}

IngredientsList.propTypes = {
  recipe: PropTypes.shape({}).isRequired,
};

export default IngredientsList;
