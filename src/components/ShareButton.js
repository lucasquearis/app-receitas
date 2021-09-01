/* eslint-disable react/prop-types */
// Requisito 51 e eua cho qeu dá para usar no 43 e no 44. Na verdade vou criar outro componente o FavoriteButton para fazer os 3 requisitos de uma vez só e renderizar dentro do Food e Drinks InProgress e do Food e do Drinks Details.

import clipboardCopy from 'clipboard-copy';
// import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [copy, setCopy] = useState(false);

  const path = () => {
    const newPath = window.location.href.replace('/in-progress', '');
    return (newPath);
  };

  return (
    <div className="share-button">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          clipboardCopy(path());
          setCopy(true);
        } }
      >
        <img src={ shareIcon } alt="share-btn" />

      </button>
      <span style={ { display: copy ? 'block' : 'none' } }>Link copiado!</span>
    </div>
  );
}

// ShareButton.propTypes = {
//   url: PropTypes.string.isRequired,
// };

export default ShareButton;
