import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

export default function ShareButton({ type, id }) {
  const [msgLink, setMsgLink] = useState('');
  const onClickShare = () => {
    setMsgLink('Link copiado!');
    navigator.clipboard.writeText(`http://localhost:3000/${type}/${id}`);
  };

  return (
    <div>
      <p>{msgLink}</p>
      <button
        type="button"
        style={ { border: 'none', background: 'none' } }
        onClick={ onClickShare }
      >
        <img data-testid="share-btn" src={ shareIcon } alt="Compartilhar" />
      </button>
    </div>
  );
}

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
