import React from 'react';
import PropTypes from 'prop-types';

function IngredientsCard({ src, name, index }) {
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        alt="imagem"
        data-testid={ `${index}-card-img` }
        src={ src }
        name={ name }
      />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </div>
  );
}

IngredientsCard.propTypes = ({
  src: PropTypes.string,
  name: PropTypes.string,
  index: PropTypes.string,
}).isRequired;

export default IngredientsCard;
