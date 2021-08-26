import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const {
    className,
    handleChange,
    label,
    name,
    placeholder,
    testId,
    type,
    value,
  } = props;

  return (
    <label htmlFor={ name }>
      { label }
      <input
        className={ className }
        data-testid={ testId }
        id={ name }
        name={ name }
        onChange={ handleChange }
        placeholder={ placeholder }
        type={ type }
        value={ value }
      />
    </label>
  );
}

const { func, string, number, oneOfType } = PropTypes;
Input.propTypes = {
  className: string,
  handleChange: func.isRequired,
  label: string.isRequired,
  name: string.isRequired,
  placeholder: string,
  testId: string,
  type: string.isRequired,
  value: oneOfType([string, number]).isRequired,
};

Input.defaultProps = {
  className: '',
  placeholder: '',
  testId: '',
};

export default Input;
