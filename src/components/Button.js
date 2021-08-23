import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ btnText, onClick, datatestId }) => (
  <button
    type="button"
    onClick={ onClick }
    data-testId={ datatestId }
  >
    {btnText}
  </button>
);

Button.propTypes = {
  btnText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  datatestId: PropTypes.func.isRequired,
};

export default Button;
