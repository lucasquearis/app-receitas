import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { text, onClick, className } = props;

  return (
    <button
      type="button"
      onClick={ onClick }
      className={ className }
    >
      { text }
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;
