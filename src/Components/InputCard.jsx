import React from 'react';
import PropTypes from 'prop-types';

function InputCard({ labelText, id, name, type, onChange, testId }) {
  return (
    <label htmlFor={ id }>
      { labelText }
      <input
        id={ id }
        name={ name }
        type={ type }
        data-testid={ testId }
        onChange={ onChange }
      />
    </label>
  );
}
InputCard.defaultProps = {
  labelText: '',
  testId: '',
};
InputCard.propTypes = {
  labelText: PropTypes.string,
  testId: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputCard;
