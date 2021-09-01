/* eslint-disable react/prop-types */
// Requisito 51 e eua cho qeu dá para usar no 43 e no 44. Na verdade vou criar outro componente o FavoriteButton para fazer os 3 requisitos de uma vez só e renderizar dentro do Food e Drinks InProgress e do Food e do Drinks Details.

import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

function ShareButton({ url }) {
  const [copy, setCopy] = useState(false);

  return (
    <div className="share-button">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          navigator.clipboard.writeText(url);
          setCopy(true);
        } }
      >
        <img src={ shareIcon } alt="share-btn" />

      </button>
      <span style={ { display: copy ? 'block' : 'none' } }>Link copiado</span>
    </div>
  );
}

export default ShareButton;
