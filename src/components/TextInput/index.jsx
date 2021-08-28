import React from 'react';
import PropTypes from 'prop-types';

function TextInput({ id, onChange, dataId, placeholder, name }) {
  return (
    <label htmlFor={ id }>
      <input
        id={ id }
        type="text"
        onChange={ onChange }
        data-testid={ dataId }
        placeholder={ placeholder }
        name={ name }
      />
    </label>
  );
}

TextInput.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  dataId: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default TextInput;
