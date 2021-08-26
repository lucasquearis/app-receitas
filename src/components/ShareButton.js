import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import './css/ShareButton.css';

const ShareButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timeOut = 2000;

  const handleShareBtn = () => {
    clipboardCopy(window.location.href);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, timeOut);
  };

  return (
    <>
      <button
        className="share-btn"
        type="button"
        data-testid="share-btn"
        onClick={ handleShareBtn }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      { isVisible && <div className="alert">Link copiado!</div> }
    </>
  );
};

export default ShareButton;
