import React from 'react';
import PropTypes from 'prop-types';

export default function Input({
  handleChange,
  name,
  text,
  type,
  testId,
  value,
  placeholder,
}) {
  return (
    <label htmlFor={ name }>
      { text }
      <input
        type={ type }
        name={ name }
        id={ name }
        value={ value }
        onChange={ handleChange }
        data-testid={ testId }
        placeholder={ placeholder }
      />
    </label>
  );
}

Input.defaultProps = {
  text: '',
  type: 'text',
  testId: 'none',
  placeholder: '',
  value: null,
  handleChange: null,
};

Input.propTypes = {
  testId: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
