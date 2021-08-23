import React from 'react';
import PropTypes from 'prop-types';

function IconButton({ image, ...rest }) {
  return (
    <button type="button" { ...rest }>
      <img src={ image } alt="Icon" />
    </button>
  );
}

IconButton.propTypes = {
  image: PropTypes.string.isRequired,
};

export default IconButton;
