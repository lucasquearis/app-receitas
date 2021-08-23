import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ textInput, textLabel, onChange, name, datatestId, placeH }) => (
  <label htmlFor={ name }>
    {textLabel}
    <input
      type={ textInput }
      name={ name }
      data-testId={ datatestId }
      onChange={ onChange }
      placeholder={ placeH }
    />
  </label>
);

Input.propTypes = {
  textInput: PropTypes.string.isRequired,
  textLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  datatestId: PropTypes.string.isRequired,
  placeH: PropTypes.string.isRequired,
};

export default Input;
