import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  textInput,
  textLabel,
  onChange,
  name,
  datatestId,
  placeH,
  id,
  value,
}) => (
  <label htmlFor={ id }>
    {textLabel}
    <input
      type={ textInput }
      name={ name }
      data-testid={ datatestId }
      onChange={ onChange }
      placeholder={ placeH }
      id={ id }
      value={ value }
    />
  </label>
);

Input.propTypes = {
  textInput: PropTypes.string,
  textLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  datatestId: PropTypes.string.isRequired,
  placeH: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.string,
};

Input.defaultProps = {
  textInput: '',
  textLabel: '',
  id: '',
  value: '',
};

export default Input;
