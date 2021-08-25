import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function IconButton({ image, ...rest }) {
  return (
    <button className="icon-button" type="button" { ...rest } src={ image }>
      <img src={ image } alt="Icon" />
    </button>
  );
}

IconButton.propTypes = {
  image: PropTypes.string.isRequired,
};

export default IconButton;
