import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = ({ id, className, type, buttonText, pathname, isDisable, onClick }) => {
  const [redirect, setRedirect] = useState(false);

  const handleRedirect = () => setRedirect(true);

  const handleClick = () => {
    if (!isDisable) {
      onClick();
      handleRedirect();
    }
  };

  return (
    ((redirect && (pathname.length > 0) && !isDisable) ? (
      <Redirect to={ pathname } />
    ) : (
      <button
        id={ id }
        className={ className }
        name={ buttonText }
        data-testid={ id }
        type={ (type === 'submit' ? 'submit' : 'button') }
        onClick={ isDisable ? handleClick : onClick }
        disabled={ isDisable }
      >
        { buttonText }
      </button>
    ))
  );
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisable: PropTypes.bool.isRequired,
};

Button.defaultProps = {
  type: undefined,
};

export default Button;
