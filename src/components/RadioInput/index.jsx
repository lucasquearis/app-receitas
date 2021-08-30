import React from 'react';
import PropTypes from 'prop-types';

function RadioInput({ id, onChange, dataId, name, value, label }) {
  return (
    <label htmlFor={ id }>
      {label}
      <input
        id={ id }
        type="radio"
        onChange={ onChange }
        data-testid={ dataId }
        name={ name }
        value={ value }
      />
    </label>
  );
}

RadioInput.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  dataId: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
}.isRequired;

export default RadioInput;
