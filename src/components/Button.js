import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { text, onClick, testId, className, disabled } = props;

  return (
    <button
      type="button"
      onClick={ onClick }
      data-testid={ testId }
      className={ className }
      disabled={ disabled }
      value={ text }
    >
      { text }
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  testId: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  testId: '',
  className: '',
  disabled: false,
};

export default Button;
