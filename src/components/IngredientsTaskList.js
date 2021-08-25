import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import './css/IngredientsTaskList.css';

function IngredientsTaskList({ ingList, handleCheckIngredient }) {
  return (
    <ul>
      {ingList.map(({ ing, checked }, index) => (
        <li key={ ing }>
          <label
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ `${ing}-check-input` }
            className={ checked ? 'ing-checked' : '' }
          >
            <input
              type="checkbox"
              name={ ing }
              id={ `${ing}-check-input` }
              onChange={ handleCheckIngredient }
            />
            {ing}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default IngredientsTaskList;

IngredientsTaskList.propTypes = {
  ingList: arrayOf(shape({ ing: string })).isRequired,
  handleCheckIngredient: func.isRequired,
};
