import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import './HeaderDetails.css';

const HeaderDetails = ({ image, title, category }) => {
  const [copied, setCopied] = useState('');
  const copyLink = () => {
    copy(window.location.href);
    setCopied('Link copiado!');
  };
  return (
    <header className="header-details">
      <img
        src={ image }
        alt={ title }
        data-testid="recipe-photo"
        className="img-header"
      />
      <div className="info-container">
        <section>
          <h1 data-testid="recipe-title" className="title-details">{title}</h1>
          <p data-testid="recipe-category" className="subtitle-details">{category}</p>
        </section>
        <section className="buttons-container">
          <label htmlFor="share">
            <input
              id="share"
              type="image"
              alt="Botão compartilhar"
              src={ shareIcon }
              data-testid="share-btn"
              onClick={ copyLink }
            />
            {copied}
          </label>
          <input
            type="image"
            src={ favoriteIcon }
            alt="Botão de favoritar"
            data-testid="favorite-btn"
          />
        </section>
      </div>
    </header>
  );
};
HeaderDetails.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default HeaderDetails;
