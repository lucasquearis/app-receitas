import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [showMsg, setShowMsg] = useState(false);
  const { pathname } = useLocation();
  const local = `http://localhost:3000${pathname}`;

  // const { location: { href } } = location;
  // console.log(link);

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        key={ shareIcon }
        onClick={ () => { navigator.clipboard.writeText(local); setShowMsg(true); } }
      >
        <img src={ shareIcon } alt="share-icon" />
        { showMsg ? <p>Link copiado!</p> : undefined }
      </button>
    </div>
  );
}

export default ShareButton;
