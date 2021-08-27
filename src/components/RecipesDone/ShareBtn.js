import React, { useState } from 'react';
import { string } from 'prop-types';
import icon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareBtn({ type, id, testId, className }) {
  const [isCopied, setIsCopied] = useState(false);
  let path = '';
  if (type === 'comida') {
    path = `http://localhost:3000/comidas/${id}`;
  }
  if (type === 'bebida') {
    path = `http://localhost:3000/bebidas/${id}`;
  }

  const handleShare = () => {
    copy(path);
    setIsCopied(true);
  };

  return (
    <button
      src={ icon }
      type="button"
      className={ className }
      data-testid={ testId }
      onClick={ handleShare }
    >
      <img
        src={ icon }
        alt="share button"
        width="22px"
      />
      {isCopied && 'Link copiado!'}
    </button>
  );
}

ShareBtn.propTypes = {
  type: string.isRequired,
  id: string.isRequired,
  testId: string.isRequired,
  className: string,
};

ShareBtn.defaultProps = {
  className: '',
};

export default ShareBtn;
