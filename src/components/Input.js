import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { label, type, value, testId, id, onChange, className } = props;
  return (
    <label htmlFor={ id }>
      <span className="sr-only">
        { label}
      </span>
      <input
        type={ type }
        value={ value }
        data-testid={ testId }
        id={ id }
        onChange={ onChange }
        className={ className }
        placeholder={ label }
      />
    </label>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  testId: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  type: 'text',
  testId: '',
  id: '',
  className: '',
};

export default Input;
