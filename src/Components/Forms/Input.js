import React from 'react';

export default function Input({ handleChange, name, text, type, testId, value }) {
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
      />
    </label>
  );
}

Input.defaultProps = {
  text: '',
  type: 'text',
  testId: 'none',
};

Input.propTypes = {
  testId: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
