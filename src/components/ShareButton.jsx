import React from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const ShareButton = ({ id, setLinkShare, type }) => (
  <button
    data-testid="share-btn"
    className="details__share-btn"
    onClick={ () => {
      copy(`https://lucasquearis.github.io/${type}/${id}`);
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
