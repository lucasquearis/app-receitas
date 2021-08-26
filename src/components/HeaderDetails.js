import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';


export default function HeaderDetails({ name, img, aux }) {
  const [copySuccess, setCopySuccess] = useState('');
  const { location: { pathname } } = useHistory();
  const copyToClipboard = `http://localhost:3000${pathname}`;

  const handleShare = () => {
    navigator.clipboard.writeText(copyToClipboard);
    setCopySuccess('Link copiado!')

  }
    
  return (
    <header>
      <p>{copyToClipboard}</p>
      <img src={ img } alt={ name } data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{ name }</h1>
      <input
        src={ shareIcon }
        alt="Share Icon"
        type="image"
        data-testid="share-btn"
        onClick={ handleShare }
      />
      <input
        src={ whiteHeartIcon }
        alt="Favorite Icon"
        type="image"
        data-testid="favorite-btn"
        // onClick={ handleFavorite }
      />
      <p>{ copySuccess }</p>
      { aux && <p data-testid="recipe-category">{ aux }</p> }      
    </header>
  );
}

HeaderDetails.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  aux: PropTypes.string.isRequired,  
};
