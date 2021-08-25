import React from 'react';
import { arrayOf, string } from 'prop-types';

function IngredientsTaskList({ ingList }) {
  console.log(ingList);
  return (
    <>
      {ingList.map((ing, index) => (
        <span key={ ing } data-testid={ `${index}-ingredient-step` }>{ing}</span>
      ))}
    </>
  );
}

export default IngredientsTaskList;

IngredientsTaskList.propTypes = {
  ingList: arrayOf(string).isRequired,
};
