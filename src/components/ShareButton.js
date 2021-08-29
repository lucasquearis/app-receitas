import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [copiedURL, setCopiedURL] = useState(false);
  const type = pathname.includes('comidas') ? 'comidas' : 'bebidas';

  return (
    <div>
      <label htmlFor="share-btn">
        <input
          type="image"
          src={ shareIcon }
          alt="Ícone de copiar"
          data-testid="share-btn"
          onClick={ () => {
            copy(`http://localhost:3000/${type}/${id}`);
            setCopiedURL(true);
          } }
        />
      </label>
      <div>
        {copiedURL ? <span>Link copiado!</span> : null}
      </div>
    </div>
  );
}

export default ShareButton;
