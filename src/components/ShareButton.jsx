import React from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const ShareButton = ({ id, setLinkShare, type }) => (
  <button
    data-testid="share-btn"
    className="share-btn"
    onClick={ () => {
      copy(`http://localhost:3000/${type}/${id}`);
      setLinkShare(true);
    } }
    type="button"
  >
    <img
      src={ shareIcon }
      alt="imagem de compartilhar"
    />
  </button>
);

ShareButton.propTypes = {
  id: PropTypes.number,
  setLinkShare: PropTypes.func,
}.isRequired;

export default ShareButton;
