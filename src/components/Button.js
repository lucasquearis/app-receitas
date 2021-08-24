import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ btnText, onClick, datatestId, disabled }) => (
  <button
    type="button"
    onClick={ onClick }
    data-testId={ datatestId }
    disabled={ disabled }
  >
    {btnText}
  </button>
);

Button.propTypes = {
  btnText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  datatestId: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
