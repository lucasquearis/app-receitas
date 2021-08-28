import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../cssPages/ButtonShare.css';

const shareMsgDuration = 2000;
const copy = require('clipboard-copy');

function ShareButton() {
  const [showShareMsg, setShowShareMsg] = useState(false);
  const { pathname } = useLocation();

  const shareImgClick = () => {
    copy((`http://localhost:3000${pathname}`).replace('/in-progress', ''));
    setShowShareMsg(true);
    setTimeout(() => setShowShareMsg(false), shareMsgDuration);
  };

  return (
    <>
      <button type="button" onClick={ shareImgClick }>
        <img
          src={ shareIcon }
          alt="Compartilhe o link desta receita"
          data-testid="share-btn"
        />
      </button>
      {showShareMsg && <p>Link copiado!</p>}
    </>
  );
}

export default ShareButton;
