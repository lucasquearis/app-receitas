import React from 'react';
import PropTypes from 'prop-types';

function IngredientsCard({ src, name, index }) {
  return (
    <div className="image-section" data-testid={ `${index}-ingredient-card` }>
      <img
        className="ingredient-image"
        alt="imagem"
        data-testid={ `${index}-card-img` }
        src={ src }
        name={ name }
      />
      <h3 data-testid={ `${index}-card-name` }>{ name }</h3>
    </div>
  );
}

IngredientsCard.propTypes = ({
  src: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.string,
}).isRequired;

export default IngredientsCard;
