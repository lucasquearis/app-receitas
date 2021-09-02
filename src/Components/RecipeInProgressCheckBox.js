import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './RecipeInProgressCheckBox.css';

function RecipeInProgressCheckBox({ isChecked, ingredient, index, changeChecked }) {
  const [checkState, setCheckState] = useState(isChecked);

  const handleCheck = (currentIndex) => {
    setCheckState(!checkState);
    changeChecked(currentIndex);
  };

  return (
    <label
      className={ checkState ? 'checked' : 'notChecked' }
      htmlFor={ `${ingredient}-checkbox` }
    >
      <input
        id={ `${ingredient}-checkbox` }
        type="checkbox"
        checked={ checkState ? 'checked' : false }
        onChange={ () => handleCheck(index) }
      />
      {ingredient}
    </label>
  );
}

RecipeInProgressCheckBox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  changeChecked: PropTypes.func.isRequired,
};

export default RecipeInProgressCheckBox;
