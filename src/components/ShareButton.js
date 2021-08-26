import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import '../styles/RecipeDetails.css';

function ShareButton({ index, address }) {
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  const localHostAddress = 'http://localhost:3000';
  const { pathname } = history.location;
  const handleClick = () => {
    copy(`${localHostAddress}${address || pathname}`);
    setCopied(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClick }
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
  index: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
};

export default ShareButton;
