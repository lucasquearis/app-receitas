import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const shareMsgDuration = 2000;
const copy = require('clipboard-copy');

function ShareButton(data) {
  const { url, index, shareButton } = data;
  const [showShareMsg, setShowShareMsg] = useState(false);
  const { pathname } = useLocation();

  const shareImgClick = () => {
    const value = url || `http://localhost:3000${pathname}`;
    copy(value);
    setShowShareMsg(true);
    setTimeout(() => setShowShareMsg(false), shareMsgDuration);
  };

  return (
    <>
      <button type="button" onClick={ shareImgClick }>
        <img
          className={ shareButton }
          src={ shareIcon }
          alt="Compartilhe o link desta receita"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      {showShareMsg && <p>Link copiado!</p>}
    </>
  );
}

export default ShareButton;
