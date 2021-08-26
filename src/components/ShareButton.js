import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import '../styles/RecipeDetails.css';

function ShareButton(props) {
  const [copied, setCopied] = useState(false);
  const localHostAddress = 'http://localhost:3000';
  const { pathname } = props;
  const handleClick = () => {
    copy(`${localHostAddress}${pathname}`);
    setCopied(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClick }
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
  pathname: PropTypes.string.isRequired,
};

export default ShareButton;
