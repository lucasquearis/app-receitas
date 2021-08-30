import React from 'react';
import PropTypes from 'prop-types';

function Button({ name, onClick, datatestid }) {
  return (
    <button
      type="button"
      data-testid={ datatestid }
      onClick={ onClick }
    >
      { name }
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  datatestid: PropTypes.string.isRequired,
};

export default Button;
