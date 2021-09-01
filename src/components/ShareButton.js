import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [copy, setCopy] = useState(false);

  const path = () => {
    const newPath = window.location.href.replace('/in-progress', '');
    return (newPath);
  };

  return (
    <div className="share-button">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          clipboardCopy(path());
          setCopy(true);
        } }
      >
        <img src={ shareIcon } alt="share-btn" />

      </button>
      <span style={ { display: copy ? 'block' : 'none' } }>Link copiado!</span>
    </div>
  );
}

export default ShareButton;
