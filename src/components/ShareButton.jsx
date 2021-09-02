import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ index, pathname }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    copy(`${pathname}`);
    setCopied(true);
    console.log(pathname);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => handleClick() }
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
      >
        <img
          className="share-image"
          type="image/svg+xml"
          src={ shareIcon }
          data-testid="share-btn"
          alt="Compartilhar"
        />
      </button>
      { copied && <p>Link copiado!</p> }
    </div>
  );
}

ShareButton.propTypes = {
  pathname: PropTypes.string,
  index: PropTypes.number,
  address: PropTypes.string,
}.isRequired;

export default ShareButton;
