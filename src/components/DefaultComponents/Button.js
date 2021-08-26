import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const {
    className,
    disabled,
    handleClick,
    name,
    testId,
  } = props;

  return (
    <button
      className={ className }
      disabled={ disabled }
      data-testid={ testId }
      onClick={ handleClick }
      type="button"
    >
      { name }
    </button>
  );
}

const { bool, func, string, oneOfType } = PropTypes;
Button.propTypes = {
  className: oneOfType([bool, string]),
  disabled: bool,
  handleClick: func.isRequired,
  name: string.isRequired,
  testId: string,
};

Button.defaultProps = {
  className: '',
  disabled: false,
  testId: '',
};

export default Button;
