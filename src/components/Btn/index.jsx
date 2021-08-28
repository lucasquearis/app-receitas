import React from 'react';
import PropTypes from 'prop-types';
import '../foodDrinks.css';

function Btn({ onClick, dataId, info, className }) {
  return (
    <button
      type="button"
      onClick={ onClick }
      data-testid={ dataId }
      className={ className }
    >
      { info }
    </button>
  );
}

Btn.propTypes = {
  onClick: PropTypes.func,
  dataId: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  info: PropTypes.string,
}.isRequired;

export default Btn;
