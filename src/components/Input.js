import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  id,
  labelText,
  type,
  className,
  name,
  value,
  placeHolder,
  searchOption,
  onChange,
  required,
}) => (
  type === 'text' || type === 'email' || type === 'password' ? (
    <label htmlFor={ id } className={ `${className}-label` }>
      { labelText }
      <input
        type={ type }
        id={ id }
        data-testid={ id }
        className={ `${className} ${id}` }
        name={ name }
        value={ value }
        placeholder={ placeHolder }
        onChange={ onChange }
        required={ required }
      />
    </label>
  ) : (
    <label htmlFor={ id } className={ `${className}-label` }>
      <input
        type={ type }
        id={ id }
        data-testid={ id }
        className={ `${className} ${id}` }
        name={ name }
        value={ value }
        checked={ searchOption === name }
        onChange={ onChange }
      />
      { labelText }
    </label>
  )
);
Input.propTypes = {
  labelText: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  searchOption: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
};

Input.defaultProps = {
  labelText: undefined,
  placeHolder: undefined,
  searchOption: undefined,
};

export default Input;
