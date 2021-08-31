import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ pathname }) {
  const [copied, setCopied] = useState(false);
  const timer = 5000;

  const shareHandleClick = () => {
    setCopied(true);
    copy(`http://localhost:3000/${pathname}`);
    setTimeout(() => setCopied(false), timer);
  };

  return (
    <div>
      {copied ? <p data-testid="share-btn">Link copiado!</p> : <Image
        data-testid="share-btn"
        src={ shareIcon }
        alt="share icon"
        onClick={ () => shareHandleClick() }
      />}
    </div>
  );
}

ShareButton.propTypes = {
  pathname: PropTypes.string.isRequired,
};
