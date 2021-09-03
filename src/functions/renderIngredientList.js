import React from 'react';
import Input from '../Input';

const renderIngredientList = (ingredients, checked, handleCheck) => (
  ingredients.map((ingredient, index) => (
    <li
      key={ index }
      style={ checked.includes(index) ? { textDecoration: 'line-through' } : {} }
      data-testid={ `${index}-ingredient-step` }
    >
      <Input
        type="checkbox"
        checked={ checked.includes(index) }
        onChange={ () => handleCheck(index) }
      />
      { ingredient }
    </li>
  ))
);

export default renderIngredientList;
