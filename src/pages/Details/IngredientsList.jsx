import React from 'react';
import PropTypes from 'prop-types';

import './IngredientsList.css';

function IngredientsList({ list }) {
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {list.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { `- ${ingredient.name} - ${ingredient.measure}` }
          </li>
        ))}
      </ul>
    </div>
  );
}

IngredientsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IngredientsList;
