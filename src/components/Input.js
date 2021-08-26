import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ textInput, textLabel, onChange, name, testId, placeH, id, value }) => (
  <label htmlFor={ id }>
    {textLabel}
    <input
      type={ textInput }
      name={ name }
      data-testId={ testId }
      onChange={ onChange }
      placeholder={ placeH }
      id={ id }
      value={ value }
    />
  </label>
);

Input.propTypes = {
  textInput: PropTypes.string.isRequired,
  textLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  testId: PropTypes.string.isRequired,
  placeH: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
