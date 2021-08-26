import React from 'react';

function RadioInput() {
  return (
    <label htmlFor="ingredient-search-radio">
      Ingrediente
      <input
        id="ingredient-search-radio"
        type="radio"
        onChange={ handleChange }
        data-testid="ingredient-search-radio"
        name="selectedSearch"
        value="ingredient"
      />
    </label>
  );
}

export default RadioInput;
