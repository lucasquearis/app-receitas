import React from 'react';
import PropTypes from 'prop-types';

function IconBtn({ onClick, dataId, src, alt, dataImgId }) {
  return (
    <button type="button" onClick={ onClick } data-testid={ dataId }>
      <img
        data-testid={ dataImgId }
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
  dataImgId: PropTypes.string,
}.isRequired;

export default IconBtn;
