import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ButtonCard({ buttonText, onClick, testId, page }) {
  return (
    <Link
      to={ page }
    >
      <button
        type="button"
        data-testid={ testId }
        onClick={ onClick }
      >
        { buttonText }
      </button>
    </Link>
  );
}

ButtonCard.defaultProps = {
  testId: '',
  onClick: () => {},
};

ButtonCard.propTypes = {
  buttonText: PropTypes.string.isRequired,
  testId: PropTypes.string,
  page: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ButtonCard;
