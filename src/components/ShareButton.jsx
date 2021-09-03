import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [showMsg, setShowMsg] = useState(false);
  const { pathname } = useLocation();
  let path = pathname;
  if (pathname.includes('/in-progress')) {
    [path] = [pathname.split('/in-progress')[0]];
    console.log(path);
  }

  const local = `http://localhost:3000${path}`;

  const handleShare = () => {
    navigator.clipboard.writeText(local);
    setShowMsg(true);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        key={ shareIcon }
        onClick={ () => handleShare() }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      { showMsg ? <span>Link copiado!</span> : undefined }
    </div>
  );
}

export default ShareButton;
