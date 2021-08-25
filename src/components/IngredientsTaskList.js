import React from 'react';
import { arrayOf, string } from 'prop-types';

function IngredientsTaskList({ ingList }) {
  return (
    <ul>
      {ingList.map((ing, index) => (
        // <span key={ ing } data-testid={ `${index}-ingredient-step` }>{ing}</span>
        <li key={ ing }>
          <label
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ `${ing}-check-input` }
          >
            <input type="checkbox" name={ ing } id={ `${ing}-check-input` } />
            {ing}
          </label>
        </li>
      ))}
    </ul>
  );
}

export default IngredientsTaskList;

IngredientsTaskList.propTypes = {
  ingList: arrayOf(string).isRequired,
};
