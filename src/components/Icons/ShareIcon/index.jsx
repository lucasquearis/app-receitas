import React from 'react';
import { Image } from 'react-bootstrap';
import copy from 'clipboard-copy';
import { useLocation } from 'react-router-dom';

import share from '../../../images/shareIcon.svg';

function ShareIcon() {
  const { pathname } = useLocation();
  const handleClick = () => {
    const URL = `http://localhost:3000${pathname}`;
    copy(URL);
  };
  return (
    <button onClick={ handleClick } data-testid="share-btn" type="button">
      <Image
        className="header-icon"
        src={ share }
        alt="share-icon"
      />
    </button>
  );
}

export default ShareIcon;
