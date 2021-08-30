import React from 'react';
import PropTypes from 'prop-types';

function IconBtn({ onClick, dataId, src, alt }) {
  return (
    <button src={ src } type="button" onClick={ onClick } data-testid={ dataId }>
      <img
        src={ src }
        alt={ alt }
      />
    </button>
  );
}

IconBtn.propTypes = {
  onClick: PropTypes.func,
  dataId: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
}.isRequired;

export default IconBtn;
