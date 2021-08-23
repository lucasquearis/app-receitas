import React from 'react';
import PropTypes from 'prop-types';

export default function Input(props) {
  const {
    className,
    id,
    label,
    name,
    onChange,
    placeholder,
    testId,
    type,
    value } = props;

  return (
    <label htmlFor={ id }>
      { label }
      <input
        className={ className }
        data-testid={ testId }
        id={ id }
        name={ name }
        onChange={ onChange }
        placeholder={ placeholder }
        type={ type }
        value={ value }
      />
    </label>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  testId: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Input.defaultProps = {
  className: '',
  label: '',
  placeholder: '',
  testId: '',
  value: '',
};
