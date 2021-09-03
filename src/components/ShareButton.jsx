import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareButtonHandle from '../services/Sharebuttonhandle';
import shareIcon from '../images/shareIcon.svg';

function ShareButton(props) {
  const [copiedbutton, setcopy] = useState(false);
  const { id, type, datatestid } = props;
  const onclickHandle = () => {
    const timeout = 3000;
    shareButtonHandle(type, id);
    setcopy(true);
    setTimeout(() => {
      setcopy(false);
    }, timeout);
    return null;
  };

  return (
    <button
      type="button"
      onClick={ () => { onclickHandle(); } }
    >
      <img alt="share" data-testid={ datatestid } src={ shareIcon } />
      <p>
        {copiedbutton ? <p>Link copiado!</p> : ''}
      </p>
    </button>
  );
}

const { string } = PropTypes;
ShareButton.propTypes = {
  id: string.isRequired,
  type: string.isRequired,
  datatestid: string.isRequired,
};

export default ShareButton;
