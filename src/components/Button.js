import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ btnText, onClick, datatestId, disabled }) => (
  <button
    type="button"
    onClick={ onClick }
    data-testid={ datatestId }
    disabled={ disabled }
  >
    {btnText}
  </button>
);

Button.propTypes = {
  btnText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  datatestId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
