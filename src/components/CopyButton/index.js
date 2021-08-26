import React, { useState } from 'react';
import Copy from 'clipboard-copy';
import PropTypes from 'prop-types';

import ShareIcon from '../../images/shareIcon.svg';

export default function CopyButton({ path }) {
  const [isHidden, setIsHidden] = useState(true);

  const handleClipboardCopy = () => {
    const timer = 2000;
    setIsHidden(false);
    Copy(`http://localhost:3000${path}`);
    setTimeout(() => {
      setIsHidden(true);
    }, timer);
  };

  return (
    <div>
      <button
        type="button"
        src={ ShareIcon }
        onClick={ () => handleClipboardCopy() }
        data-testid="share-btn"
      >
        <img src={ ShareIcon } alt="Botão de compartilhar" />
      </button>
      <div hidden={ isHidden }>
        <span>Link copiado!</span>
      </div>
    </div>
  );
}

CopyButton.propTypes = {
  path: PropTypes.string.isRequired,
};
