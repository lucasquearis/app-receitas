import React from 'react';
import { Button } from 'react-bootstrap';
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
        <Button
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="Botão compartilhar" className="icons" />
        </Button>
        <Button
          data-testid="favorite-btn"
        >
          <img src={ favoriteIcon } alt="Botão de favoritar" className="icons" />
        </Button>
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
