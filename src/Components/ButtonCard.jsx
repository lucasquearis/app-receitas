import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ButtonCard({ buttonText, onClick, testId, page, disabled }) {
  return (
    <Link
      to={ page }
    >
      <button
        type="button"
        data-testid={ testId }
        onClick={ onClick }
        disabled={ disabled }
      >
        { buttonText }
      </button>
    </Link>
  );
}

ButtonCard.defaultProps = {
  testId: '',
  onClick: () => {},
  disabled: () => {},
};

ButtonCard.propTypes = {
  buttonText: PropTypes.string.isRequired,
  testId: PropTypes.string,
  page: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ButtonCard;
