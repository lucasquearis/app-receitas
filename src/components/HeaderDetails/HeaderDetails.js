import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';
import './HeaderDetails.css';

const HeaderDetails = ({ image, title, category }) => (
  <header className="header-details">
    <img src={ image } alt={ title } data-testid="recipe-photo" className="img-header" />
    <div className="info-container">
      <section>
        <h1 data-testid="recipe-title" className="title-details">{title}</h1>
        <p data-testid="recipe-category" className="subtitle-details">{category}</p>
      </section>
      <section className="buttons-container">
        <input
          type="image"
          alt="Botão compartilhar"
          src={ shareIcon }
          data-testid="share-btn"
        />
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

HeaderDetails.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default HeaderDetails;
