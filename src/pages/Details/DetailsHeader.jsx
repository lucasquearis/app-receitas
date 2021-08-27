import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FavoriteIcon from '../../components/Icons/FavoriteIcon';
import ShareIcon from '../../components/Icons/ShareIcon';
import './DetailsHeader.css';

function DetailsHeader({ title, subtitle, favorite }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    setIsCopied(true);
  };

  return (
    <header className="header-container">
      <div className="header-title-container">
        <h1 data-testid="recipe-title" className="header-title">{title}</h1>
        <h4 data-testid="recipe-category" className="header-subtitle">{subtitle}</h4>
      </div>
      <div className="header-icons-container">
        <div className="buttons-container">
          <ShareIcon dataTestId="share-btn" onClick={ handleClick } />
          <FavoriteIcon dataTestId="favorite-btn" recipe={ favorite } />
        </div>
        {isCopied && <p className="copied-msg">Link copiado!</p>}
      </div>
    </header>
  );
}

DetailsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  favorite: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default DetailsHeader;
