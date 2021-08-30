import React from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from '../utils/clipboardCopy';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ id, type }) {
  return (
    <div>
      <button
        type="button"
        onClick={ () => clipboardCopy(type, id) }
        data-testid="share-btn"
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
        />
        <p id={ `copyMessage${id}` }> Compartilhar </p>
      </button>
    </div>
  );
}

ShareBtn.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
}.isRequired;

export default ShareBtn;
