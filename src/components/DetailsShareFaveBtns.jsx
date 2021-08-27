import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/Details.css';

function DetailsShareFaveBtns() {
  const [isCopied, setIsCopied] = useState(false);

  function copyRecipeURL() {
    const url = document.createElement('input');
    url.value = window.location.href;
    document.body.appendChild(url);
    url.select();
    document.execCommand('copy');
    document.body.removeChild(url);
    setIsCopied(true);
  }

  return (
    <div className="share-fave-btns">
      { isCopied
        ? <div className="copy-div">Link copiado! </div>
        : <div className="copy-div" /> }
      <button
        type="button"
        data-testid="share-btn"
        className="share-btn"
        onClick={ copyRecipeURL }
      >
        <img src={ shareIcon } alt="share icon" className="share-icon" />
      </button>
      <button type="button" data-testid="favorite-btn" className="fave-btn">
        <img src={ whiteHeartIcon } alt="favorite icon" />
      </button>
    </div>
  );
}

export default DetailsShareFaveBtns;
