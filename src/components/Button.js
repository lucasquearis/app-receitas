import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { text, onClick, testId, className } = props;

  return (
    <button
      type="button"
      onClick={ onClick }
      data-testid={ testId }
      className={ className }
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
};

Button.defaultProps = {
  testId: '',
  className: '',
};

export default Button;
