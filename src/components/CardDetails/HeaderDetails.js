import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';

const HeaderDetails = ({ image, title, category }) => (
  <header>
    <img src={ image } alt={ tilte } data-testid="recipe-photo" />
    <div>
      <section>
        <h1 data-testid="recipe-title">{title}</h1>
        <p data-testid="recipe-category">{category}</p>
      </section>
      <section>
        <Button
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="Botão compartilhar" />
        </Button>
        <Button
          data-testid="favorite-btn"
        >
          <img src={ favoriteIcon } alt="Botão de favoritar" />
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
