import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import '../styles/RecipeDetails.css';

function ShareButton() {
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  const localHostAddress = 'http://localhost:3000';
  const { pathname } = history.location;
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

export default ShareButton;
