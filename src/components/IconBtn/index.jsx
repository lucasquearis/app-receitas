import React from 'react';
import PropTypes from 'prop-types';

function IconBtn({ onClick, dataId, src, alt }) {
  return (
    <button type="button" onClick={ onClick }>
      <img
        data-testid={ dataId }
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
