import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Button } from 'react-bootstrap';
import shareIcon from '../../images/shareIcon.svg';

function ShareButton() {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <Button
        variant="success"
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          clipboardCopy(window.location.href);
          setCopied(true);
        } }
      >
        <img src={ shareIcon } alt="share-icon" />
      </Button>
      { copied ? (<p>Link copiado!</p>) : '' }
    </div>
  );
}

export default ShareButton;
