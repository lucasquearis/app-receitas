import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { label, type, value, testId, id, className } = props;
  return (
    <label htmlFor={ id }>
      { label }
      <input
        type={ type }
        value={ value }
        data-testid={ testId }
        id={ id }
        className={ className }
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
