import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RecipeInProgressIngredients({ isChecked, ingredient, index, changeChecked }) {
  const [checkState, setCheckState] = useState(isChecked);

  const handleCheck = (currentIndex) => {
    setCheckState(!checkState);
    changeChecked(currentIndex);
  };

  return (
    <label htmlFor={ `${ingredient}-checkbox` }>
      <input
        id={ `${ingredient}-checkbox` }
        type="checkbox"
        checked={ checkState }
        onChange={ () => handleCheck(index) }
      />
      {ingredient}
    </label>
  );
}

RecipeInProgressIngredients.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  changeChecked: PropTypes.func.isRequired,
};

export default RecipeInProgressIngredients;
